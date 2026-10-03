import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentUser, getUserDefaultTeam } from '@/lib/auth/session'
import { SignUpForm } from '@/components/auth/sign-up-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function SignUpPage() {
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
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-muted-foreground text-center">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
