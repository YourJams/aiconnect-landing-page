import { Header } from '@/components/header'
import { MemberForm } from '@/components/member-form'

export const metadata = {
  title: 'Be A Member - AiConnect',
  description: 'Join AiConnect and become a member today',
}

export default function MemberFormPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center min-h-screen px-4 py-16">
        <div className="w-full max-w-2xl">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
              <h1 className="text-4xl sm:text-5xl font-bold text-balance">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Be A Member
                </span>
              </h1>
              <p className="text-lg text-foreground/60">
                Join AiConnect and unlock exclusive opportunities
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-card rounded-2xl border border-secondary/20 p-8 sm:p-12">
              <MemberForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
