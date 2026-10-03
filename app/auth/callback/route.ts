import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()

    // Exchange code for session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Get user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        // Check if user has completed onboarding
        const { data: memberships } = await supabase
          .from('team_members')
          .select('team_id, teams(slug)')
          .eq('user_id', user.id)
          .limit(1)

        if (!memberships || memberships.length === 0) {
          // No team - redirect to onboarding
          return NextResponse.redirect(`${origin}/onboarding/setup`)
        } else {
          // Has team - redirect to workspace or next parameter
          const teamSlug = (memberships[0].teams as any)?.slug
          if (next && next.startsWith('/')) {
            return NextResponse.redirect(`${origin}${next}`)
          }
          return NextResponse.redirect(`${origin}/${teamSlug}`)
        }
      }
    }
  }

  // Something went wrong - redirect to sign-in
  return NextResponse.redirect(`${origin}/sign-in`)
}
