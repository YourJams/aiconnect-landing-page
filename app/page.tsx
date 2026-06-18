import { Header } from '@/components/header'
import { Hero1 } from '@/components/heroes/hero-1'
import { Hero2 } from '@/components/heroes/hero-2'
import { Hero3 } from '@/components/heroes/hero-3'
import { Hero4 } from '@/components/heroes/hero-4'
import { Hero5 } from '@/components/heroes/hero-5'
import { Hero6 } from '@/components/heroes/hero-6'

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero1 />
      <Hero3 />
      <Hero2 />
      <Hero4 />
      <Hero5 />
      <Hero6 />
    </main>
  )
}
