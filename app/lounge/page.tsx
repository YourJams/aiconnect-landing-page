import { Header } from '@/components/header'
import { LoginForm } from '@/components/login-form'

export default function LoungeePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center min-h-screen px-4 pt-16">
        <LoginForm />
      </div>
    </main>
  )
}
