'use client'

import { useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

const partners = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    description: 'Tech & AI Content Creator | 500K+ followers',
    video: '/vid1.mp4',
  },
  {
    id: 2,
    name: 'David Chen',
    description: 'Filmmaker & Producer | 1M+ followers',
    video: '/vid2.mp4',
  },
  {
    id: 3,
    name: 'Luna Rodriguez',
    description: 'Music Producer & Creator | 750K+ followers',
    video: '/vid3.mp4',
  },
  {
    id: 4,
    name: 'James Thompson',
    description: 'Podcast Host & Interviewer | 600K+ followers',
    video: '/vid5.mp4',
  },
  {
    id: 5,
    name: 'Priya Patel',
    description: 'Educational Content Creator | 800K+ followers',
    video: '/vid1.mp4',
  },
  {
    id: 6,
    name: 'Marcus Johnson',
    description: 'Gaming & Entertainment | 1.2M+ followers',
    video: '/vid2.mp4',
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
                {/* Video Player - Half of card */}
                <div className="w-full h-48 bg-black overflow-hidden">
                  <VideoPlayer src={partner.video} />
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
