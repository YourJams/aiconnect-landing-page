import Link from 'next/link'
import { Button } from '../ui/button'

export function Hero1() {
  return (
    <section id="hero-1" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-32 pb-16 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AI Connect
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-foreground/70 mt-4">
                Elevate your content with cutting-edge AI tools designed for creators. Get paid what you deserve while building your audience.
              </p>
            </div>
            
            <div className="flex gap-4">
              <Link href="/lounge">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8">
                  Get Started
                </Button>
              </Link>
              <Button variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 px-6 sm:px-8">
                Learn More
              </Button>
            </div>

            <div className="flex gap-8 pt-8 border-t border-border/50">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-foreground/60">Active Creators</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-secondary">$50M+</div>
                <div className="text-sm text-foreground/60">Earnings Distributed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-accent">100%</div>
                <div className="text-sm text-foreground/60">Creator Owned</div>
              </div>
            </div>
          </div>

          {/* Video Card (Placeholder) */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm aspect-[9/16] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/20">
              <div className="text-center space-y-4">
                <div className="text-5xl">▶</div>
                <p className="text-sm text-foreground/60">TikTok Video Card</p>
                <p className="text-xs text-foreground/40">Vertical Format - 400px Height</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
