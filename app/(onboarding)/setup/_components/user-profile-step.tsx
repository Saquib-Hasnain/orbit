'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface UserProfileStepProps {
  defaultName: string
  userEmail: string
  onComplete: (data: { full_name: string }) => void
}

export function UserProfileStep({
  defaultName,
  userEmail,
  onComplete,
}: UserProfileStepProps) {
  const [fullName, setFullName] = useState(defaultName)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (fullName.trim().length >= 2) {
      onComplete({ full_name: fullName.trim() })
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="text-lg">
            {fullName ? getInitials(fullName) : '?'}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">{userEmail}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="full_name">Your name</Label>
        <Input
          id="full_name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe"
          required
          minLength={2}
          maxLength={100}
        />
        <p className="text-sm text-muted-foreground">
          This is how your name will appear to your team members
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={fullName.trim().length < 2}>
        Continue
      </Button>
    </form>
  )
}
