'use client'

import { useState } from 'react'
import { signInAction, signInWithMagicLinkAction } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { OAuthButtons } from '@/components/auth/oauth-buttons'
import { toast } from 'sonner'

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showMagicLink, setShowMagicLink] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)

  async function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await signInAction(formData)

    if (result?.error) {
      toast.error(result.error)
      setIsLoading(false)
    }
    // On success, the action redirects
  }

  async function handleMagicLinkSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await signInWithMagicLinkAction(formData)

    setIsLoading(false)

    if (result?.error) {
      toast.error(result.error)
    } else {
      setMagicLinkSent(true)
      toast.success('Check your email for a magic link to sign in')
    }
  }

  return (
    <div className="space-y-6">
      <OAuthButtons />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      {!showMagicLink ? (
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                onClick={() => setShowMagicLink(true)}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Use magic link
              </button>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="magic-email">Email</Label>
            <Input
              id="magic-email"
              name="email"
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              required
              disabled={isLoading || magicLinkSent}
            />
          </div>
          {magicLinkSent && (
            <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
              Check your email for a magic link to sign in.
            </div>
          )}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowMagicLink(false)
                setMagicLinkSent(false)
              }}
              disabled={isLoading}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isLoading || magicLinkSent}
              className="flex-1"
            >
              {isLoading ? 'Sending...' : 'Send magic link'}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
