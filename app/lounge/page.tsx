'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { LoginForm } from '@/components/login-form'

export default function LoungeePage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .shake-button {
          animation: shake 0.5s infinite;
        }
      `}</style>

      <div className="flex items-center justify-center min-h-screen px-4 pt-16">
        <div className="w-full max-w-md space-y-6">
          <LoginForm />
          
          <div className="relative pt-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-foreground/50">or</span>
            </div>
          </div>

          <button
            onClick={() => router.push('/member-form')}
            className="shake-button w-full px-6 py-3 font-semibold text-foreground rounded-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          >
            Be A Member
          </button>
        </div>
      </div>
    </main>
  )
}
