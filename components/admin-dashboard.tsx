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
  const [allUsers, setAllUsers] = useState<MemberRegistration[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalPending: 0,
    totalIncome: 0,
  })
  const [selectedUser, setSelectedUser] = useState<MemberRegistration | null>(null)
  const [activeTab, setActiveTab] = useState<'member-approvals' | 'user-management'>('member-approvals')
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch data on load
  useEffect(() => {
    fetchNonMembers()
    fetchStats()
    fetchAllUsers()
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

      const totalMembers = data?.filter((user) => user.role === 'member').length ?? 0
      const totalPending = data?.filter((user) => user.role === 'non_member').length ?? 0
      const totalIncome = totalMembers * 2000

      setStats({ totalMembers, totalPending, totalIncome })
    } catch (err) {
      console.error(err)
    }
  }

  const fetchAllUsers = async () => {
    const { data, error } = await supabase
      .from('member_registrations')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) {
      setAllUsers(data || [])
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
      await fetchAllUsers()
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
      await fetchAllUsers()
      setRegistrations(prev => prev.filter(reg => reg.id !== id))
      fetchStats()
    } catch (err) {
      console.error('Error rejecting member:', err)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleViewUser = (user: MemberRegistration) => {
    setSelectedUser(user)
  }

  // Filtering for User Management
  const filteredUsers = allUsers.filter((user) => {
    const query = searchTerm.toLowerCase()
    return (
      user.first_name.toLowerCase().includes(query) ||
      user.last_name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.phone_number.toLowerCase().includes(query)
    )
  })

  return (
    <div className="space-y-6">

      {/* Navigation Tabs */}
      <div className="flex gap-3 border-b border-border pb-4 mb-4">
        <button
          onClick={() => setActiveTab('member-approvals')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'member-approvals'
              ? 'bg-primary text-white'
              : 'bg-muted'
          }`}
        >
          Member Approvals
        </button>
        <button
          onClick={() => setActiveTab('user-management')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'user-management'
              ? 'bg-primary text-white'
              : 'bg-muted'
          }`}
        >
          User Management
        </button>
      </div>

      {/* Conditionally show Member Approvals or User Management */}
      {activeTab === 'member-approvals' && (
        <>
          {/* Pending Member Approvals */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Pending Member Approvals
            </h1>
            <div className="mb-4 text-foreground/60">{registrations.length} pending</div>
            {registrations.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border border-border/50">
                <p>No pending member requests</p>
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
                    {/* Payment Receipt */}
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
          </div>
        </>
      )}

      {activeTab === 'user-management' && (
        <div className="bg-card border border-border/50 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold">User Management</h2>
          <input
            type="text"
            placeholder="Search by name, username, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2"
          />
          <div className="space-y-3">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="border border-border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className="text-sm text-foreground/60">@{user.username}</p>
                    <p className="text-sm">{user.phone_number}</p>
                  </div>
                  <Button onClick={() => handleViewUser(user)}>
                    View Details
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-foreground/60 py-6">No users found.</p>
            )}
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative w-[95%] max-w-2xl rounded-xl bg-card p-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Member Information</h2>
            <div className="space-y-3">
              <p>
                <strong>Name:</strong>{' '}
                {selectedUser.first_name}{' '}
                {selectedUser.middle_name ?? ''}{' '}
                {selectedUser.last_name}
              </p>
              <p>
                <strong>Username:</strong> @{selectedUser.username}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUser.phone_number}
              </p>
              <p>
                <strong>Sponsor:</strong> {selectedUser.sponsor_full_name}
              </p>
              <p>
                <strong>Payment Status:</strong> {selectedUser.payment_status}
              </p>
              <p>
                <strong>Registered:</strong>{' '}
                {new Date(selectedUser.created_at).toLocaleString()}
              </p>
              <div className="pt-2">
                <button
                  onClick={() =>
                    setSelectedReceipt(selectedUser.receipt_file_url)
                  }
                  className="text-primary underline"
                >
                  View Receipt
                </button>
              </div>
              {/* Role change dropdown */}
              <div className="pt-3">
                <label className="block mb-2 font-medium">Change Role</label>
                <select
                  value={selectedUser.role}
                  onChange={async (e) => {
                    const newRole = e.target.value as 'admin' | 'member' | 'non_member'
                    const { error } = await supabase
                      .from('member_registrations')
                      .update({
                        role: newRole,
                        payment_status:
                          newRole === 'member'
                            ? 'verified'
                            : selectedUser.payment_status,
                      })
                      .eq('id', selectedUser.id)
                    if (!error) {
                      setSelectedUser({ ...selectedUser, role: newRole })
                      fetchAllUsers()
                      fetchStats()
                      fetchNonMembers()
                    }
                  }}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                >
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                  <option value="non_member">Pending</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Popup */}
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