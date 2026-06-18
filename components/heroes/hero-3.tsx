const partners = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    description: 'Tech & AI Content Creator | 500K+ followers',
    image: '/partner-placeholder.jpg',
  },
  {
    id: 2,
    name: 'David Chen',
    description: 'Filmmaker & Producer | 1M+ followers',
    image: '/partner-placeholder.jpg',
  },
  {
    id: 3,
    name: 'Luna Rodriguez',
    description: 'Music Producer & Creator | 750K+ followers',
    image: '/partner-placeholder.jpg',
  },
  {
    id: 4,
    name: 'James Thompson',
    description: 'Podcast Host & Interviewer | 600K+ followers',
    image: '/partner-placeholder.jpg',
  },
  {
    id: 5,
    name: 'Priya Patel',
    description: 'Educational Content Creator | 800K+ followers',
    image: '/partner-placeholder.jpg',
  },
  {
    id: 6,
    name: 'Marcus Johnson',
    description: 'Gaming & Entertainment | 1.2M+ followers',
    image: '/partner-placeholder.jpg',
  },
]

export function Hero3() {
  return (
    <section id="hero-3" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-32 bg-gradient-to-br from-background to-secondary/5">
      <div className="max-w-6xl mx-auto w-full">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
              Content Creator Partners
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Meet the talented creators who are leading the way on AiConnect
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="group bg-card rounded-2xl border border-secondary/20 overflow-hidden hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/10 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image - Half of card */}
                <div className="w-full h-48 bg-gradient-to-br from-secondary/20 to-primary/20 overflow-hidden">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content - Half of card */}
                <div className="p-6 sm:p-8 space-y-3">
                  <h3 className="text-xl font-bold text-foreground">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {partner.description}
                  </p>

                  {/* Stats */}
                  <div className="pt-4 border-t border-border/50 flex gap-4 text-xs">
                    <div>
                      <div className="text-primary font-semibold">Active</div>
                      <div className="text-foreground/40">Partner</div>
                    </div>
                    <div>
                      <div className="text-secondary font-semibold">Verified</div>
                      <div className="text-foreground/40">Creator</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
