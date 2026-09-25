import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentUser, getUserDefaultTeam } from '@/lib/auth/session'
import { SignInForm } from '@/components/auth/sign-in-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function SignInPage() {
  // Redirect if already authenticated
  const user = await getCurrentUser()
  if (user) {
    const defaultTeam = await getUserDefaultTeam(user.id)
    if (defaultTeam) {
      redirect(`/${defaultTeam.slug}`)
    } else {
      redirect('/onboarding/setup')
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-muted-foreground text-center">
          Don&apos;t have an account?{' '}
          <Link
            href="/sign-up"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
