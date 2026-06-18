'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Play, Pause } from 'lucide-react'

export function Hero1() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section id="hero-1" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-32 pb-16 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <img src="/aiconnect.png" alt="AI Connect Logo" className="h-20 w-auto mb-6" />
              <p className="text-lg sm:text-xl text-foreground/70">
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

          {/* Video Card */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm aspect-[9/16] bg-black rounded-3xl border-2 border-primary/50 shadow-lg shadow-primary/30 overflow-hidden relative group">
              <video
                ref={videoRef}
                width="400"
                height="712"
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/video1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="bg-primary/90 hover:bg-primary p-4 rounded-full">
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" fill="white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
