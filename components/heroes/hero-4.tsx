import { Zap, Shield, Users, TrendingUp, Sparkles } from 'lucide-react'

const benefits = [
  {
    id: 1,
    icon: TrendingUp,
    title: 'Monetize Your Content',
    description: 'Earn directly from your audience with transparent, creator-friendly rates',
  },
  {
    id: 2,
    icon: Zap,
    title: 'AI-Powered Tools',
    description: 'Access cutting-edge AI tools to enhance, edit, and optimize your content instantly',
  },
  {
    id: 3,
    icon: Shield,
    title: 'Creator Protection',
    description: 'Your rights are protected with industry-leading IP security and fair contracts',
  },
  {
    id: 4,
    icon: Users,
    title: 'Community Support',
    description: 'Join a thriving community of creators for collaboration and growth opportunities',
  },
  {
    id: 5,
    icon: Sparkles,
    title: 'Exclusive Features',
    description: 'Get early access to new features and premium tools for member creators',
  },
]

export function Hero4() {
  return (
    <section id="hero-4" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-32 bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="max-w-6xl mx-auto w-full">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
              Why Join AiConnect?
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Everything you need to succeed as a creator in the AI age
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.id}
                  className="bg-card rounded-xl border border-primary/20 p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
