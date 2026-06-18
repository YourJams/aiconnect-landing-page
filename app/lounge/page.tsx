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
        @keyframes tiltShake {
          0%, 100% { transform: translateX(0) rotateZ(0deg); }
          15% { transform: translateX(-2px) rotateZ(-1deg); }
          30% { transform: translateX(2px) rotateZ(1deg); }
          45% { transform: translateX(-2px) rotateZ(-1deg); }
          60% { transform: translateX(2px) rotateZ(1deg); }
          75% { transform: translateX(-2px) rotateZ(-1deg); }
        }
        .tilt-shake-button {
          animation: tiltShake 0.6s infinite;
        }
      `}</style>

      <div className="flex items-center justify-center min-h-screen px-4 pt-16">
        <div className="w-full max-w-md">
          <LoginForm onMemberClick={() => router.push('/member-form')} />
        </div>
      </div>
    </main>
  )
}
