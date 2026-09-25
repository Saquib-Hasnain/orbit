import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createClient } from '@/lib/supabase/server'

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)

  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ['/sign-in', '/sign-up', '/auth/callback', '/']
  const isPublicRoute = publicRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  )

  // If accessing a public route, allow through
  if (isPublicRoute) {
    // If authenticated user tries to access auth pages, redirect to workspace
    if (user && (pathname === '/sign-in' || pathname === '/sign-up')) {
      const supabase = await createClient()
      const { data: memberships } = await supabase
        .from('team_members')
        .select('team_id, teams(slug)')
        .eq('user_id', user.id)
        .limit(1)

      if (memberships && memberships.length > 0) {
        const teamSlug = (memberships[0].teams as any)?.slug
        return NextResponse.redirect(new URL(`/${teamSlug}`, request.url))
      } else {
        return NextResponse.redirect(new URL('/onboarding/setup', request.url))
      }
    }
    return supabaseResponse
  }

  // Redirect unauthenticated users to sign-in
  if (!user) {
    const signInUrl = new URL('/sign-in', request.url)
    signInUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Check if authenticated user needs onboarding
  if (!pathname.startsWith('/onboarding')) {
    const supabase = await createClient()
    const { data: memberships } = await supabase
      .from('team_members')
      .select('team_id')
      .eq('user_id', user.id)
      .limit(1)

    if (!memberships || memberships.length === 0) {
      return NextResponse.redirect(new URL('/onboarding/setup', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
