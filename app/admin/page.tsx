import { Header } from '@/components/header'
import { AdminDashboard } from '@/components/admin-dashboard'

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 pt-24">
        <AdminDashboard />
      </div>
    </main>
  )
}
