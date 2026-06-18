'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'

const testimonials = [
  {
    id: 1,
    name: 'Alex Rivera',
    title: 'Content Creator',
    quote: 'AiConnect transformed how I manage my content. The tools are intuitive and the earnings are incredible!',
    views: '2.5M views',
  },
  {
    id: 2,
    name: 'Jordan Chen',
    title: 'YouTube Creator',
    quote: 'Finally a platform that respects creator rights. Best decision I made for my channel.',
    views: '1.8M views',
  },
  {
    id: 3,
    name: 'Emma Studios',
    title: 'Video Production',
    quote: 'The AI tools saved me hours every week. Now I focus on creativity, not tedious editing.',
    views: '3.1M views',
  },
  {
    id: 4,
    name: 'Marcus Lee',
    title: 'Streaming Creator',
    quote: 'The community and support here is unmatched. I grew my audience by 300% in 6 months.',
    views: '2.2M views',
  },
  {
    id: 5,
    name: 'Sophie & Co',
    title: 'Podcast Network',
    quote: 'AiConnect gave us the tools to scale. Their support team is phenomenal.',
    views: '1.5M views',
  },
]

export function Hero2() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setAutoPlay(false)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoPlay(false)
  }

  return (
    <section id="hero-2" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-32 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="max-w-6xl mx-auto w-full">
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

          {/* Carousel */}
          <div className="relative">
            {/* Cards Container */}
            <div className="overflow-hidden">
              <div
                className="transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                <div className="flex">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="w-full flex-shrink-0 px-4 sm:px-6"
                    >
                      <div className="bg-card rounded-2xl border border-primary/20 p-8 sm:p-10 space-y-6">
                        {/* Video Placeholder */}
                        <div className="w-full aspect-[9/16] bg-gradient-to-br from-secondary/20 to-primary/20 rounded-xl flex items-center justify-center border border-secondary/30">
                          <div className="text-center space-y-2">
                            <div className="text-4xl">🎬</div>
                            <p className="text-xs text-foreground/40">Video Testimonial</p>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                          <blockquote className="text-lg sm:text-xl text-foreground italic">
                            "{testimonial.quote}"
                          </blockquote>

                          <div className="pt-4 border-t border-border/50">
                            <p className="font-semibold text-foreground">{testimonial.name}</p>
                            <p className="text-sm text-foreground/60">{testimonial.title}</p>
                            <p className="text-xs text-primary mt-2">{testimonial.views}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 sm:-translate-x-20 p-2 hover:bg-primary/20 rounded-full transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 sm:translate-x-20 p-2 hover:bg-primary/20 rounded-full transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-muted hover:bg-muted/80'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
