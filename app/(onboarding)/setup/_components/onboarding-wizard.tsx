'use client'

import { useState } from 'react'
import { UserProfileStep } from './user-profile-step'
import { TeamCreationStep } from './team-creation-step'

interface OnboardingWizardProps {
  userId: string
  defaultName: string
  userEmail: string
}

export function OnboardingWizard({
  userId,
  defaultName,
  userEmail,
}: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [userData, setUserData] = useState({
    full_name: defaultName,
  })

  const handleUserProfileComplete = (data: { full_name: string }) => {
    setUserData(data)
    setCurrentStep(2)
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  return (
    <div className="space-y-8">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
              currentStep >= 1
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-muted bg-background'
            }`}
          >
            1
          </div>
          <span className="ml-2 text-sm font-medium">Profile</span>
        </div>
        <div className="h-[2px] w-16 bg-border" />
        <div className="flex items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
              currentStep >= 2
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-muted bg-background'
            }`}
          >
            2
          </div>
          <span className="ml-2 text-sm font-medium">Workspace</span>
        </div>
      </div>

      {/* Step content */}
      {currentStep === 1 && (
        <UserProfileStep
          defaultName={userData.full_name}
          userEmail={userEmail}
          onComplete={handleUserProfileComplete}
        />
      )}

      {currentStep === 2 && (
        <TeamCreationStep userData={userData} onBack={handleBack} />
      )}
    </div>
  )
}
