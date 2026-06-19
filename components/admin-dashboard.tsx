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
  password?: string
}

export function AdminDashboard() {
  const [registrations, setRegistrations] = useState<MemberRegistration[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalPending: 0,
    totalIncome: 0,
  })

  // Search states
  const [searchUsername, setSearchUsername] = useState('')
  const [searchedMember, setSearchedMember] = useState<MemberRegistration | null>(null)
  const [searchLoading, setSearchLoading] = useState(false)

  // Fetch data on load
  useEffect(() => {
    fetchNonMembers()
    fetchStats()
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

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('member_registrations')
        .select('role')

      if (error) throw error

      const totalMembers =
        data?.filter((user) => user.role === 'member').length ?? 0
      const totalPending =
        data?.filter((user) => user.role === 'non_member').length ?? 0
      const totalIncome = totalMembers * 2000

      setStats({ totalMembers, totalPending, totalIncome })
    } catch (err) {
      console.error(err)
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
      fetchStats()
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
      fetchStats()
    } catch (err) {
      console.error('Error rejecting member:', err)
    } finally {
      setUpdatingId(null)
    }
  }

  // Search function
  const searchMember = async () => {
    if (!searchUsername.trim()) return
    setSearchLoading(true)
    try {
      const { data, error } = await supabase
        .from('member_registrations')
        .select('*')
        .or(
          `username.ilike.%${searchUsername}%,first_name.ilike.%${searchUsername}%,last_name.ilike.%${searchUsername}%`
        )
        .limit(1)

      if (error || !data || data.length === 0) {
        setSearchedMember(null)
      } else {
        setSearchedMember(data[0])
      }
    } catch (err) {
      console.error(err)
      setSearchedMember(null)
    } finally {
      setSearchLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-foreground/50">Loading registrations...</div>
  }

  return (
    <div className="space-y-6">

      {/* Search Member UI */}
      <div className="bg-card border border-border/50 rounded-lg p-5 space-y-4">
        <h2 className="text-xl font-bold">Search Member</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
            placeholder="Enter username, first or last name..."
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
          />
          <Button onClick={searchMember} disabled={searchLoading}>
            {searchLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
        {searchedMember && (
          <div className="border border-border rounded-lg p-4 mt-4 space-y-2">
            <p>
              <strong>Name:</strong> {searchedMember.first_name} {searchedMember.middle_name ?? ''} {searchedMember.last_name}
            </p>
            <p>
              <strong>Username:</strong> @{searchedMember.username}
            </p>
            <p>
              <strong>Phone:</strong> {searchedMember.phone_number}
            </p>
            <p>
              <strong>Sponsor:</strong> {searchedMember.sponsor_full_name}
            </p>
            <p>
              <strong>Role:</strong> {searchedMember.role}
            </p>
            <p>
              <strong>Payment Status:</strong> {searchedMember.payment_status}
            </p>
            <p>
              <strong>Registered:</strong> {new Date(searchedMember.created_at).toLocaleString()}
            </p>
            <button
              onClick={() => setSelectedReceipt(searchedMember.receipt_file_url)}
              className="text-primary underline"
            >
              View Receipt
            </button>
            {/* Role dropdown */}
            <div className="mt-2">
              <label className="block mb-1 font-medium">Change Role:</label>
              <select
                value={searchedMember.role}
                onChange={async (e) => {
                  const newRole = e.target.value as 'admin' | 'member' | 'non_member'
                  const { error } = await supabase
                    .from('member_registrations')
                    .update({
                      role: newRole,
                      payment_status:
                        newRole === 'member' ? 'verified' : searchedMember.payment_status,
                    })
                    .eq('id', searchedMember.id)

                  if (!error) {
                    setSearchedMember({ ...searchedMember, role: newRole })
                    fetchStats()
                    fetchNonMembers()
                  } else {
                    alert(error.message)
                  }
                }}
                className="border rounded px-3 py-2 bg-background"
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="non_member">Non Member</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border/50 rounded-lg p-5">
          <p className="text-sm text-foreground/60">Total Members</p>
          <h2 className="text-3xl font-bold mt-2">{stats.totalMembers}</h2>
        </div>
        <div className="bg-card border border-border/50 rounded-lg p-5">
          <p className="text-sm text-foreground/60">Pending Members</p>
          <h2 className="text-3xl font-bold mt-2">{stats.totalPending}</h2>
        </div>
        <div className="bg-card border border-border/50 rounded-lg p-5">
          <p className="text-sm text-foreground/60">Total Income</p>
          <h2 className="text-3xl font-bold mt-2">
            ₱{stats.totalIncome.toLocaleString()}
          </h2>
          <p className="text-xs text-foreground/50 mt-1">
            Based on ₱2,000 per approved member
          </p>
        </div>
      </div>

      {/* Pending Member Approvals Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-foreground">Pending Member Approvals</h1>
        <div className="text-sm text-foreground/60">{registrations.length} pending</div>
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
                    onClick={() => setSelectedReceipt(reg.receipt_file_url)}
                    className="text-primary underline"
                  >
                    View Receipt
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

      {/* Receipt modal popup */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative max-w-4xl w-[90%] bg-card rounded-xl p-4">
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-2 right-2 text-xl text-white"
            >
              ✕
            </button>
            <img
              src={selectedReceipt}
              alt="Receipt"
              className="w-full max-h-[80vh] object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  )
}