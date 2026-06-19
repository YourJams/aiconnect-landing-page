'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface LoginFormProps {
  onMemberClick?: () => void
}

export function LoginForm({ onMemberClick }: LoginFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPendingModal, setShowPendingModal] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase
      .from('member_registrations')
      .select('role, username, password')
      .eq('username', username)
      .eq('password', password)
      .single()

    setLoading(false)

    if (error || !data) {
      alert('Invalid username or password')
      return
    }

    // Allow both admins and members to access /admin
    if (['admin', 'member'].includes(data.role)) {
      window.location.href = '/admin'
      return
    }

    // Show pending dialog for non-members
    setShowPendingModal(true)
  }

  return (
    <>
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
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-primary/20 p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-foreground/60">Sign in to your AiConnect account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-foreground">
                Username or Email
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="#"
                className="text-sm text-primary hover:text-secondary transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black/20 hover:bg-black/30 text-foreground border border-black/30 border-solid py-2 transition-all"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="border-t border-border/50" />

          {/* Be A Member Button */}
          <button
            onClick={onMemberClick}
            className="tilt-shake-button w-full px-6 py-3 font-semibold text-foreground rounded-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          >
            Be A Member
          </button>

          {/* Additional Links */}
          <div className="pt-4 border-t border-border/50 flex justify-center gap-4 text-xs text-foreground/50">
            <Link href="#" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-primary transition-colors">
              Help
            </Link>
          </div>
        </div>
      </div>

      {/* Account Pending Verification Modal */}
      {showPendingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-xl p-6 max-w-md w-[90%] border border-primary/20 shadow-xl">
            <h2 className="text-xl font-bold mb-3 text-center">
              Account Pending Verification
            </h2>
            <p className="text-center text-foreground/70">
              Your account has not yet been verified by the administrator.
              <br />
              <br />
              Please wait while your membership application is reviewed.
              Verification typically takes up to <strong>24 hours</strong>.
            </p>
            <button
              onClick={() => setShowPendingModal(false)}
              className="mt-6 w-full rounded-lg bg-primary px-4 py-2 text-white hover:opacity-90"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}