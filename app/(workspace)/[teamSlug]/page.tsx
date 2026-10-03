import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/auth/session'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface WorkspacePageProps {
  params: Promise<{
    teamSlug: string
  }>
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { teamSlug } = await params
  const user = await requireAuth()

  const supabase = await createClient()

  // Verify user is a member of this team
  const { data: membership } = await supabase
    .from('team_members')
    .select('role, teams(id, name, slug, plan)')
    .eq('user_id', user.id)
    .eq('teams.slug', teamSlug)
    .single()

  if (!membership) {
    redirect('/sign-in')
  }

  const team = membership.teams as any

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Welcome to {team.name}! 🎉</CardTitle>
          <CardDescription>
            Your workspace is ready. Board management coming in Milestone 3.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Workspace Details</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Name:</dt>
                <dd className="font-medium">{team.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">URL:</dt>
                <dd className="font-medium">/{team.slug}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Plan:</dt>
                <dd className="font-medium capitalize">{team.plan}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Your Role:</dt>
                <dd className="font-medium capitalize">{membership.role}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              Milestone 2 (Authentication &amp; Onboarding) is complete! 🚀
              <br />
              <br />
              Coming in Milestone 3:
            </p>
            <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Workspace sidebar &amp; navigation</li>
              <li>Board creation &amp; management</li>
              <li>Team switcher</li>
              <li>Command palette (Cmd+K)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
