'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from './ui/button'
import { MobileMenu } from './mobile-menu'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleScroll = (sectionId: string) => {
    setMenuOpen(false)
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold hover:opacity-80 transition-opacity">
            <span className="text-primary">AI</span>
            <span className="text-foreground">Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-8">
              <button
                onClick={() => handleScroll('hero-1')}
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                AI Connect
              </button>
              <button
                onClick={() => handleScroll('hero-2')}
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                What Creators Say
              </button>
              <button
                onClick={() => handleScroll('hero-3')}
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Creators
              </button>
              <button
                onClick={() => handleScroll('hero-4')}
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Why Us
              </button>
              <button
                onClick={() => handleScroll('hero-5')}
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Pricing
              </button>
            </nav>
            <Link href="/lounge">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Member Lounge
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/lounge">
              <Button variant="outline" className="text-xs">
                Member Lounge
              </Button>
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onScroll={handleScroll} />
    </>
  )
}
