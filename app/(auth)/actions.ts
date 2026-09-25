'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signInSchema, signUpSchema, magicLinkSchema } from '@/lib/validations/auth'
import type { SignInInput, SignUpInput, MagicLinkInput } from '@/lib/validations/auth'

type ActionResult = {
  error?: string
  success?: boolean
}

/**
 * Sign up a new user with email and password
 */
export async function signUpAction(
  formData: FormData
): Promise<ActionResult> {
  const rawData = {
    fullName: formData.get('full_name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  // Validate input
  const result = signUpSchema.safeParse(rawData)
  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const { fullName, email, password } = result.data

  try {
    const supabase = await createClient()

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      return { error: error.message }
    }

    if (!data.user) {
      return { error: 'Failed to create user' }
    }

    // Redirect to onboarding
    redirect('/onboarding/setup')
  } catch (error) {
    console.error('Sign up error:', error)
    return { error: 'An unexpected error occurred' }
  }
}

/**
 * Sign in a user with email and password
 */
export async function signInAction(
  formData: FormData
): Promise<ActionResult> {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Validate input
  const result = signInSchema.safeParse(rawData)
  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const { email, password } = result.data

  try {
    const supabase = await createClient()

    // Sign in the user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: error.message }
    }

    if (!data.user) {
      return { error: 'Failed to sign in' }
    }

    // Check if user has completed onboarding
    const { data: memberships } = await supabase
      .from('team_members')
      .select('team_id, teams(slug)')
      .eq('user_id', data.user.id)
      .limit(1)

    if (!memberships || memberships.length === 0) {
      // No team - redirect to onboarding
      redirect('/onboarding/setup')
    } else {
      // Has team - redirect to workspace
      const teamSlug = (memberships[0].teams as any)?.slug
      redirect(`/${teamSlug}`)
    }
  } catch (error) {
    console.error('Sign in error:', error)
    return { error: 'An unexpected error occurred' }
  }
}

/**
 * Send magic link for passwordless sign-in
 */
export async function signInWithMagicLinkAction(
  formData: FormData
): Promise<ActionResult> {
  const rawData = {
    email: formData.get('email') as string,
  }

  // Validate input
  const result = magicLinkSchema.safeParse(rawData)
  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const { email } = result.data

  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Magic link error:', error)
    return { error: 'An unexpected error occurred' }
  }
}

/**
 * Sign out the current user
 */
export async function signOutAction() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/sign-in')
  } catch (error) {
    console.error('Sign out error:', error)
    return { error: 'Failed to sign out' }
  }
}
