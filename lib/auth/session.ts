import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export type UserTeam = {
  id: string
  name: string
  slug: string
  avatar_url: string | null
  plan: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }

  // Fetch user profile from public.users
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
}

/**
 * Require authentication - redirect to sign-in if not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/sign-in')
  }
  
  return user
}

/**
 * Get user's teams with their role
 */
export async function getUserTeams(userId: string): Promise<UserTeam[]> {
  const supabase = await createClient()
  
  const { data: teamMembers, error } = await supabase
    .from('team_members')
    .select(`
      role,
      teams:team_id (
        id,
        name,
        slug,
        avatar_url,
        plan
      )
    `)
    .eq('user_id', userId)

  if (error || !teamMembers) {
    return []
  }

  return teamMembers
    .filter(tm => tm.teams)
    .map(tm => ({
      ...(tm.teams as any),
      role: tm.role as 'owner' | 'admin' | 'member' | 'viewer'
    }))
}

/**
 * Get user's default/first team
 */
export async function getUserDefaultTeam(userId: string) {
  const teams = await getUserTeams(userId)
  return teams.length > 0 ? teams[0] : null
}

/**
 * Check if user has completed onboarding (has at least one team)
 */
export async function hasCompletedOnboarding(userId: string): Promise<boolean> {
  const teams = await getUserTeams(userId)
  return teams.length > 0
}

/**
 * Check if user has completed onboarding (has at least one team)
 */
export async function hasCompletedOnboarding(userId: string) {
  const teams = await getUserTeams(userId)
  return teams.length > 0
}

/**
 * Check if user is a member of a specific team
 */
export async function isTeamMember(userId: string, teamSlug: string): Promise<boolean> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('team_members')
    .select(`
      id,
      teams:team_id!inner (
        slug
      )
    `)
    .eq('user_id', userId)
    .eq('teams.slug', teamSlug)
    .single()

  return !error && !!data
}

/**
 * Check if user has completed onboarding (has at least one team)
 */
export async function hasCompletedOnboarding(userId: string): Promise<boolean> {
  const teams = await getUserTeams(userId)
  return teams.length > 0
}

/**
 * Check if user is a member of a specific team
 */
export async function isTeamMember(userId: string, teamSlug: string): Promise<boolean> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('team_members')
    .select(`
      id,
      teams:team_id!inner (
        slug
      )
    `)
    .eq('user_id', userId)
    .eq('teams.slug', teamSlug)
    .single()

  return !error && !!data
}
