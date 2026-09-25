import Link from 'next/link'

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-md bg-primary" />
            <span className="font-bold text-xl">Orbit</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 bg-muted/30">
        <div className="w-full max-w-2xl">{children}</div>
      </main>
    </div>
  )
}
