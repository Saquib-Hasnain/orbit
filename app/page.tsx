import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { CheckCircle2 } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-lg font-bold">O</span>
            </div>
            <span className="text-xl font-semibold">Orbit</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container flex flex-col items-center gap-8 px-4 py-24 md:py-32">
          <div className="flex max-w-3xl flex-col items-center gap-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Project management
              <br />
              that moves at your speed
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Linear-inspired project management for teams. Collaborate on tasks with
              kanban boards, real-time updates, and AI-powered features.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/sign-up">Start for free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn more</Link>
              </Button>
            </div>
          </div>

          <Card className="w-full max-w-4xl">
            <CardHeader className="text-center">
              <CardTitle>🚧 Milestone 1 Complete</CardTitle>
              <CardDescription>
                Foundation, tooling, and theme system are ready
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Next.js 16 App Router</p>
                    <p className="text-sm text-muted-foreground">
                      TypeScript, React 19, proxy.ts
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">shadcn/ui Components</p>
                    <p className="text-sm text-muted-foreground">
                      Button, Input, Card, Dialog, Dropdown, Avatar, Tooltip, Sonner
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Dark Mode by Default</p>
                    <p className="text-sm text-muted-foreground">
                      Theme toggle with system preference support
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Supabase Ready</p>
                    <p className="text-sm text-muted-foreground">
                      Client utilities, middleware, local Docker setup
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex h-16 items-center justify-center px-4 text-sm text-muted-foreground">
          Built with Next.js 16, Supabase, and shadcn/ui
        </div>
      </footer>
    </div>
  )
}
