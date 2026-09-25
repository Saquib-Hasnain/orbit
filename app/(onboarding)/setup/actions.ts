'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth/session'
import { onboardingSchema } from '@/lib/validations/auth'
import { generateSlug } from '@/lib/utils/slug'
import { sendWelcomeEmail } from '@/lib/email/send'

type ActionResult = {
  error?: string
  success?: boolean
}

/**
 * Complete user onboarding by creating their profile and first team
 */
export async function completeOnboardingAction(
  formData: FormData
): Promise<ActionResult> {
  const rawData = {
    fullName: formData.get('full_name') as string,
    teamName: formData.get('team_name') as string,
    teamSlug: formData.get('team_slug') as string,
  }

  // Validate input
  const result = onboardingSchema.safeParse(rawData)
  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const { fullName, teamName, teamSlug } = result.data

  try {
    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      return { error: 'Not authenticated' }
    }

    const supabase = await createClient()

    // Check if slug is available
    const { data: existingTeam } = await supabase
      .from('teams')
      .select('id')
      .eq('slug', teamSlug)
      .single()

    if (existingTeam) {
      return { error: 'This workspace URL is already taken. Please choose another.' }
    }

    // Update user profile
    const { error: profileError } = await supabase
      .from('users')
      .update({ full_name: fullName })
      .eq('id', user.id)

    if (profileError) {
      console.error('Profile update error:', profileError)
      return { error: 'Failed to update profile' }
    }

    // Create team
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .insert({
        name: teamName,
        slug: teamSlug,
        plan: 'free',
      })
      .select()
      .single()

    if (teamError || !team) {
      console.error('Team creation error:', teamError)
      return { error: 'Failed to create workspace' }
    }

    // Add user as team owner
    const { error: memberError } = await supabase
      .from('team_members')
      .insert({
        team_id: team.id,
        user_id: user.id,
        role: 'owner',
      })

    if (memberError) {
      console.error('Team member creation error:', memberError)
      // Try to clean up the team
      await supabase.from('teams').delete().eq('id', team.id)
      return { error: 'Failed to set up workspace membership' }
    }

    // Send welcome email (non-blocking)
    sendWelcomeEmail({
      to: user.email!,
      userName: fullName,
      teamName: teamName,
      teamSlug: teamSlug,
    }).catch((error) => {
      // Log but don't fail onboarding if email fails
      console.error('Failed to send welcome email:', error)
    })

    // Redirect to workspace
    redirect(`/${teamSlug}`)
  } catch (error) {
    console.error('Onboarding error:', error)
    return { error: 'An unexpected error occurred' }
  }
}

/**
 * Check if a team slug is available
 */
export async function checkSlugAvailability(
  slug: string
): Promise<{ available: boolean }> {
  try {
    const supabase = await createClient()

    const { data } = await supabase
      .from('teams')
      .select('id')
      .eq('slug', slug)
      .single()

    return { available: !data }
  } catch (error) {
    console.error('Slug check error:', error)
    return { available: false }
  }
}
