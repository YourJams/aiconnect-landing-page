import Link from 'next/link'
import { Button } from '../ui/button'

export function Hero6() {
  return (
    <section id="hero-6" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl opacity-50" />

      <div className="max-w-4xl mx-auto w-full text-center space-y-8 relative z-10">
        {/* Main CTA */}
        <div className="space-y-6">
          <div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight">
              Ready to Level Up?
            </h2>
            <p className="text-xl sm:text-2xl text-foreground/70 mt-6 max-w-2xl mx-auto leading-relaxed">
              Join thousands of creators earning on their own terms. Start building your empire today.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/lounge">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 sm:px-12 py-6 text-lg">
                Be a Member
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full sm:w-auto border-primary/50 text-foreground hover:bg-primary/10 px-8 sm:px-12 py-6 text-lg"
            >
              Schedule Demo
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-border/50">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-primary">10K+</div>
            <p className="text-xs sm:text-sm text-foreground/60 mt-2">Active Creators</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-secondary">$50M+</div>
            <p className="text-xs sm:text-sm text-foreground/60 mt-2">Earnings Paid Out</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-accent">195+</div>
            <p className="text-xs sm:text-sm text-foreground/60 mt-2">Countries</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-primary">24/7</div>
            <p className="text-xs sm:text-sm text-foreground/60 mt-2">Support</p>
          </div>
        </div>

        {/* Testimonial */}
        <div className="pt-8 border-t border-border/50">
          <p className="text-foreground/70 italic mb-4">
            "AiConnect changed everything for us. We're earning 3x more while spending less time on admin."
          </p>
          <p className="font-semibold text-foreground">— Alex & Team, 2.5M followers</p>
        </div>
      </div>
    </section>
  )
}
