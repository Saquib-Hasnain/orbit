'use client'

import { useState, useEffect } from 'react'
import { completeOnboardingAction } from '../actions'
import { generateSlug } from '@/lib/utils/slug'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

interface TeamCreationStepProps {
  userData: {
    full_name: string
  }
  onBack: () => void
}

export function TeamCreationStep({ userData, onBack }: TeamCreationStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [teamName, setTeamName] = useState('')
  const [teamSlug, setTeamSlug] = useState('')
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false)

  // Auto-generate slug from team name
  useEffect(() => {
    if (!isSlugManuallyEdited && teamName) {
      setTeamSlug(generateSlug(teamName))
    }
  }, [teamName, isSlugManuallyEdited])

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugManuallyEdited(true)
    setTeamSlug(generateSlug(e.target.value))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    formData.append('full_name', userData.full_name)
    formData.append('team_name', teamName.trim())
    formData.append('team_slug', teamSlug.trim())

    const result = await completeOnboardingAction(formData)

    if (result?.error) {
      toast.error(result.error)
      setIsLoading(false)
    }
    // On success, the action redirects to workspace
  }

  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="team_name">Workspace name</Label>
        <Input
          id="team_name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Acme Corp"
          required
          minLength={2}
          maxLength={64}
          disabled={isLoading}
        />
        <p className="text-sm text-muted-foreground">
          The name of your company or team
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="team_slug">Workspace URL</Label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {baseUrl}/
          </span>
          <Input
            id="team_slug"
            value={teamSlug}
            onChange={handleSlugChange}
            placeholder="acme-corp"
            required
            minLength={2}
            maxLength={48}
            pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
            disabled={isLoading}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Your unique workspace URL. Can only contain lowercase letters, numbers, and dashes.
        </p>
      </div>

      {teamSlug && (
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm font-medium mb-1">Your workspace will be available at:</p>
          <p className="text-sm text-muted-foreground break-all">
            {baseUrl}/{teamSlug}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
        >
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={isLoading || !teamName.trim() || !teamSlug.trim()}
        >
          {isLoading ? 'Creating workspace...' : 'Create workspace'}
        </Button>
      </div>
    </form>
  )
}
