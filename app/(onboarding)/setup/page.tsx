import { redirect } from 'next/navigation'
import { requireAuth, getUserDefaultTeam } from '@/lib/auth/session'
import { OnboardingWizard } from './_components/onboarding-wizard'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function OnboardingSetupPage() {
  // Require authentication
  const user = await requireAuth()

  // Check if user already has a team
  const defaultTeam = await getUserDefaultTeam(user.id)
  if (defaultTeam) {
    redirect(`/${defaultTeam.slug}`)
  }

  // Get user profile data
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || ''
  const userEmail = user.email || ''

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          Welcome to Orbit! 🚀
        </CardTitle>
        <CardDescription>
          Let&apos;s set up your workspace and get you started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OnboardingWizard
          userId={user.id}
          defaultName={userName}
          userEmail={userEmail}
        />
      </CardContent>
    </Card>
  )
}
