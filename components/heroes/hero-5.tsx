import { Check } from 'lucide-react'
import { Button } from '../ui/button'

const packages = [
  {
    id: 1,
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for new creators',
    features: [
      'Basic content upload',
      'Community access',
      'Standard monetization',
      '50% earnings share',
      'Email support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    id: 2,
    name: 'Creator Pro',
    price: '$29',
    period: '/month',
    description: 'For growing creators',
    features: [
      'Advanced analytics',
      'Priority support',
      '70% earnings share',
      'AI editing tools',
      'Custom branding',
      'Collaboration features',
      'Monthly royalty reports',
    ],
    cta: 'Select Plan',
    highlighted: true,
  },
  {
    id: 3,
    name: 'Studio Elite',
    price: '$99',
    period: '/month',
    description: 'For professional teams',
    features: [
      'Team management',
      '85% earnings share',
      'White-label solutions',
      'Advanced AI suite',
      'Dedicated account manager',
      'API access',
      'Weekly performance calls',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export function Hero5() {
  return (
    <section id="hero-5" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-32 bg-gradient-to-br from-background via-secondary/5 to-background">
      <div className="max-w-6xl mx-auto w-full">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Choose the plan that fits your creator journey
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  pkg.highlighted
                    ? 'border-primary bg-card/50 shadow-xl shadow-primary/20 scale-105'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                {/* Recommended Badge */}
                {pkg.highlighted && (
                  <div className="flex justify-center mb-4 relative -top-3">
                    <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                      RECOMMENDED
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Header */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-foreground/60 mt-1">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-foreground">
                        {pkg.price}
                      </span>
                      {pkg.period && (
                        <span className="text-foreground/60">
                          {pkg.period}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full ${
                      pkg.highlighted
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {pkg.cta}
                  </Button>

                  {/* Divider */}
                  <div className="border-t border-border/50" />

                  {/* Features */}
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex gap-3 items-start">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/70">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Note */}
          <div className="text-center pt-8">
            <p className="text-foreground/60">
              All plans include 30-day free trial • Cancel anytime • No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
