'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Button } from './ui/button'
import { CheckCircle, XCircle } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface MemberRegistration {
  id: string
  username: string
  first_name: string
  middle_name: string | null
  last_name: string
  phone_number: string
  sponsor_full_name: string
  receipt_file_url: string
  payment_status: string
  role: 'admin' | 'member' | 'non_member'
  created_at: string
}

export function AdminDashboard() {
  const [registrations, setRegistrations] = useState<MemberRegistration[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    fetchNonMembers()
  }, [])

  const fetchNonMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('member_registrations')
        .select('*')
        .eq('role', 'non_member')
        .order('created_at', { ascending: false })

      if (error) throw error
      setRegistrations(data || [])
    } catch (err) {
      console.error('Error fetching registrations:', err)
    } finally {
      setLoading(false)
    }
  }

  const approveMember = async (id: string) => {
    setUpdatingId(id)
    try {
      const { error } = await supabase
        .from('member_registrations')
        .update({ role: 'member', payment_status: 'verified' })
        .eq('id', id)

      if (error) throw error

      setRegistrations(prev => prev.filter(reg => reg.id !== id))
    } catch (err) {
      console.error('Error approving member:', err)
    } finally {
      setUpdatingId(null)
    }
  }

  const rejectMember = async (id: string) => {
    setUpdatingId(id)
    try {
      const { error } = await supabase
        .from('member_registrations')
        .delete()
        .eq('id', id)

      if (error) throw error

      setRegistrations(prev => prev.filter(reg => reg.id !== id))
    } catch (err) {
      console.error('Error rejecting member:', err)
    } finally {
      setUpdatingId(null)
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-foreground/50">Loading registrations...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">
          Pending Member Approvals
        </h1>
        <div className="text-sm text-foreground/60">
          {registrations.length} pending
        </div>
      </div>

      {registrations.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border border-border/50">
          <p className="text-foreground/60">No pending member requests</p>
        </div>
      ) : (
        <div className="space-y-4">
          {registrations.map((reg) => (
            <div
              key={reg.id}
              className="bg-card border border-border/50 rounded-lg p-6 space-y-4"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {reg.first_name} {reg.middle_name ? reg.middle_name + ' ' : ''}{reg.last_name}
                  </h3>
                  <p className="text-sm text-foreground/60">@{reg.username}</p>
                </div>
                <div className="text-xs text-foreground/50">
                  {new Date(reg.created_at).toLocaleDateString()}
                </div>
              </div>

              {/* Details */}
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-foreground/60">Phone Number</p>
                  <p className="text-foreground font-medium">{reg.phone_number}</p>
                </div>
                <div>
                  <p className="text-foreground/60">Sponsor</p>
                  <p className="text-foreground font-medium">{reg.sponsor_full_name}</p>
                </div>
              </div>

              {/* Receipt Preview */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Payment Receipt</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedReceipt(selectedReceipt === reg.id ? null : reg.id)}
                    className="text-primary hover:text-secondary text-sm underline"
                  >
                    {selectedReceipt === reg.id ? 'Hide' : 'View'} Receipt
                  </button>
                  <a
                    href={reg.receipt_file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary text-sm underline"
                  >
                    Download
                  </a>
                </div>

                {selectedReceipt === reg.id && (
                  <div className="mt-4 bg-background rounded-lg p-4 max-h-96 overflow-auto">
                    <img
                      src={reg.receipt_file_url}
                      alt="Receipt"
                      className="max-w-full h-auto"
                      onError={(e) => {
                        (e.target as HTMLElement).innerHTML = '<p class="text-foreground/50">Cannot display receipt</p>'
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border/30">
                <button
                  onClick={() => approveMember(reg.id)}
                  disabled={updatingId === reg.id}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-foreground font-medium rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve Member
                </button>
                <button
                  onClick={() => rejectMember(reg.id)}
                  disabled={updatingId === reg.id}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-destructive/20 text-destructive font-medium rounded-lg hover:bg-destructive/30 disabled:opacity-50 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
