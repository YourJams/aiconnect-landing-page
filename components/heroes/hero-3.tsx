'use client'

import { useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react'

const partners = [
  {
    id: 1,
    name: 'Whamos Cruz',
    description: 'Content Creator | 500K+ followers',
    video: '/Whamos.mp4',
  },
  {
    id: 2,
    name: 'Aliya Reymundo',
    description: 'VMX Actress | 1M+ followers',
    video: '/Aliya.mp4',
  },
  {
    id: 3,
    name: 'Sachzna Laparan',
    description: 'Filipino social media influencer, actress, and entrepreneur | 750K+ followers',
    video: '/Sachzna.mp4',
  },
  {
    id: 4,
    name: 'Foreigh Germs',
    description: 'Content Creator | 600K+ followers',
    video: '/Germs.mp4',
  },
  {
    id: 5,
    name: 'Boss Toyo',
    description: 'Pawn Star, Content Creator | 800K+ followers',
    video: '/Toyo.mp4',
  },
]

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = percent * videoRef.current.duration
    }
  }

  return (
    <div className="relative group">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        playsInline
      />

      {/* Controls Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        {/* Progress Bar */}
        <div
          onClick={handleProgressClick}
          className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-3 hover:h-2 transition-all"
        >
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" fill="white" />
              ) : (
                <Play className="w-4 h-4 text-white fill-white" />
              )}
            </button>

            {/* Mute Button */}
            <button
              onClick={handleMuteToggle}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>
          </div>

          {/* Duration */}
          <div className="text-xs text-white/70">
            {videoRef.current && (
              <>
                {Math.floor(videoRef.current.currentTime)}s / {Math.floor(videoRef.current.duration)}s
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero3() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % partners.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + partners.length) % partners.length)
  }

  const visiblePartners = Array.from({ length: itemsPerView }).map((_, i) => 
    partners[(currentIndex + i) % partners.length]
  )

  return (
    <section id="hero-3" className="flex items-center justify-center px-4 sm:px-6 py-16 sm:py-32 bg-gradient-to-br from-background to-secondary/5">
      <div className="w-full">
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

          {/* Carousel Container with Navigation */}
          <div className="relative flex items-center justify-center gap-4 sm:gap-8">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-0 p-3 hover:bg-primary/20 rounded-full transition-colors z-10"
              aria-label="Previous creators"
            >
              <ChevronLeft className="w-8 h-8 text-primary" />
            </button>

            {/* Videos Container */}
            <div className="flex gap-6 sm:gap-8 justify-center px-20">
              {visiblePartners.map((partner, idx) => (
                <div
                  key={`${partner.id}-${currentIndex}-${idx}`}
                  className="group flex flex-col flex-shrink-0"
                >
                  {/* Video Player - TikTok Size */}
                  <div className="w-72 aspect-[9/16] bg-black rounded-3xl border-2 border-primary/50 shadow-lg shadow-primary/30 overflow-hidden mb-4">
                    <VideoPlayer src={partner.video} />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground text-center">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-foreground/60 text-center leading-relaxed max-w-72">
                      {partner.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-0 p-3 hover:bg-primary/20 rounded-full transition-colors z-10"
              aria-label="Next creators"
            >
              <ChevronRight className="w-8 h-8 text-primary" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3">
            {Array.from({ length: partners.length }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-muted hover:bg-muted/80'
                }`}
                aria-label={`Go to partner ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
