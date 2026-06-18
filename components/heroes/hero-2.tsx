'use client'

import { Button } from '../ui/button'

const testimonials = [
  {
    id: 1,
    name: 'Alex Rivera',
    title: 'Content Creator',
    quote: 'AiConnect transformed how I manage my content.',
    views: '2.5M views',
    video: '/video2.mp4',
  },
  {
    id: 2,
    name: 'Jordan Chen',
    title: 'YouTube Creator',
    quote: 'Finally a platform that respects creator rights.',
    views: '1.8M views',
    video: '/video3.mp4',
  },
  {
    id: 3,
    name: 'Emma Studios',
    title: 'Video Production',
    quote: 'The AI tools saved me hours every week.',
    views: '3.1M views',
    video: '/video4.mp4',
  },
  {
    id: 4,
    name: 'Marcus Lee',
    title: 'Streaming Creator',
    quote: 'I grew my audience by 300% in 6 months.',
    views: '2.2M views',
    video: '/video5.mp4',
  },
  {
    id: 5,
    name: 'Sophie & Co',
    title: 'Podcast Network',
    quote: 'AiConnect gave us the tools to scale.',
    views: '1.5M views',
    video: '/video2.mp4',
  },
]

export function Hero2() {
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <section id="hero-2" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-32 bg-gradient-to-br from-background via-primary/5 to-background">
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-container {
          animation: marquee 40s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="w-full">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
              What Creators Say
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Join thousands of creators who are already earning and growing with AiConnect
            </p>
          </div>

          {/* Marquee Container */}
          <div className="overflow-hidden">
            <div className="marquee-container flex gap-4">
              {duplicatedTestimonials.map((testimonial, idx) => (
                <div
                  key={`${testimonial.id}-${idx}`}
                  className="flex-shrink-0 w-72"
                >
                  <div className="bg-card rounded-2xl border border-primary/20 p-4 sm:p-6 space-y-3 h-full">
                    {/* Video */}
                    <div className="w-full aspect-[9/12] bg-black rounded-xl overflow-hidden border border-secondary/30">
                      <video
                        width="240"
                        height="320"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src={testimonial.video} type="video/mp4" />
                      </video>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <blockquote className="text-sm text-foreground italic line-clamp-2">
                        "{testimonial.quote}"
                      </blockquote>

                      <div className="pt-2 border-t border-border/50">
                        <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                        <p className="text-xs text-foreground/60">{testimonial.title}</p>
                        <p className="text-xs text-primary mt-1">{testimonial.views}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Text */}
          <div className="text-center">
            <p className="text-sm text-foreground/50">Hover to pause • Continuously scrolling creators</p>
          </div>
        </div>
      </div>
    </section>
  )
}
