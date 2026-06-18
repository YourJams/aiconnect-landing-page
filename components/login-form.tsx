'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate login process
    setTimeout(() => {
      setLoading(false)
      alert('Login feature coming soon!')
    }, 1500)
  }

  return (
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
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Divider */}
        <div className="border-t border-border/50" />

        {/* Sign Up Link */}
        <div className="space-y-3">
          <p className="text-sm text-center text-foreground/60">
          
          </p>
          <Link href="/lounge?signup=true">
            <Button
              variant="outline"
              className="w-full border-primary/50 text-foreground hover:bg-primary/10"
            >
              Be A Member
            </Button>
          </Link>
        </div>

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
  )
}
