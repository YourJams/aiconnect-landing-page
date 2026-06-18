'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Button } from './ui/button'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function MemberForm() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    sponsorFullName: '',
    password: '',
  })

  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setReceiptFile(e.target.files[0])
    }
  }

  const uploadReceipt = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`

    const { error: uploadError, data } = await supabase.storage
      .from('member-receipts')
      .upload(fileName, file)

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`)
    }

    const { data: publicData } = supabase.storage
      .from('member-receipts')
      .getPublicUrl(fileName)

    return publicData.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!receiptFile) {
        throw new Error('Please upload a receipt file')
      }

      // Upload receipt file
      const receiptUrl = await uploadReceipt(receiptFile)

      // Create member registration
      const { data, error: insertError } = await supabase
        .from('member_registrations')
        .insert([
          {
            username: formData.username,
            first_name: formData.firstName,
            middle_name: formData.middleName || null,
            last_name: formData.lastName,
            phone_number: formData.phoneNumber,
            sponsor_full_name: formData.sponsorFullName,
            password: formData.password,
            receipt_file_url: receiptUrl,
            payment_status: 'pending',
            role: 'non_member',
          }
        ])
        .select()

      if (insertError) {
        throw new Error(insertError.message)
      }

      setSuccess(true)
      setFormData({
        username: '',
        firstName: '',
        middleName: '',
        lastName: '',
        phoneNumber: '',
        sponsorFullName: '',
        password: '',
      })
      setReceiptFile(null)

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm">
          Account created successfully! Welcome to AiConnect.
        </div>
      )}

      {/* Sponsor Full Name */}
      <div>
        <label htmlFor="sponsorFullName" className="block text-sm font-medium text-foreground mb-2">
          Sponsor Full Name
        </label>
        <input
          type="text"
          id="sponsorFullName"
          name="sponsorFullName"
          value={formData.sponsorFullName}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="Sponsor's full name"
        />
      </div>

      {/* Username */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="Enter your username"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="Enter your password"
        />
      </div>

      {/* First Name, Middle Name, Last Name */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="First"
          />
        </div>
        <div>
          <label htmlFor="middleName" className="block text-sm font-medium text-foreground mb-2">
            Middle Name
          </label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Middle"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Last"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-foreground mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      {/* QR Code and Receipt */}
      <div className="grid md:grid-cols-2 gap-6 pt-4">
        {/* QR Code Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Scan and Pay ₱2,000</h3>
          <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-center">
            <img
              src="/qr-code.png"
              alt="Payment QR Code"
              className="w-full max-w-xs h-auto"
            />
          </div>
        </div>

        {/* Receipt Upload */}
        <div className="space-y-3">
          <label htmlFor="receipt" className="block text-sm font-medium text-foreground">
            Upload Receipt
          </label>
          <div className="relative">
            <input
              type="file"
              id="receipt"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-80"
            />
            {receiptFile && (
              <p className="mt-2 text-xs text-primary">
                ✓ {receiptFile.name}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-50"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  )
}
