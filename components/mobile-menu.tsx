'use client'

import Link from 'next/link'
import { X } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onScroll: (sectionId: string) => void
}

export function MobileMenu({ isOpen, onClose, onScroll }: MobileMenuProps) {
  const menuItems = [
    { label: 'AI Connect', id: 'hero-1' },
    { label: 'What Creators Say', id: 'hero-2' },
    { label: 'Partners', id: 'hero-3' },
    { label: 'Why Join Us', id: 'hero-4' },
    { label: 'Packages', id: 'hero-5' },
    { label: 'Join Now', id: 'hero-6' },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={`fixed top-16 left-0 bottom-0 w-64 bg-card border-r border-border z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4 border-b border-border">
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-1 p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onScroll(item.id)}
              className="w-full text-left px-4 py-3 text-sm text-foreground/70 hover:text-primary hover:bg-muted rounded-lg transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Member Lounge Link */}
        <div className="absolute bottom-6 left-4 right-4">
          <Link
            href="/lounge"
            onClick={onClose}
            className="block w-full px-4 py-2 bg-primary text-primary-foreground text-center rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go to Member Lounge
          </Link>
        </div>
      </div>
    </>
  )
}
