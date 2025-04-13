'use client'

import { Coins, Wallet } from 'lucide-react'

interface SubmitComponentProps {
  onSubmit: () => void
  hasMetrics: boolean
  walletConnected: boolean
}

export function SubmitComponent({ onSubmit, hasMetrics, walletConnected }: SubmitComponentProps) {
  if (!walletConnected) {
    return (
      <div className="space-y-4">
        <div className="alert alert-warning">
          <Wallet className="h-5 w-5" />
          <span>Connect your wallet to submit a review</span>
        </div>
        <button
          disabled
          className="btn btn-primary w-full bg-gradient-to-r from-[#c62ef8] to-[#21e3b6] border-none opacity-50"
        >
          Submit Review
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2 text-center">
        <Coins className="h-5 w-5 text-yellow-500" />
        <p className="text-sm">
          {hasMetrics ? 'You will receive 0.01 SOL for your review' : 'Add at least one metric to receive SOL rewards'}
        </p>
      </div>

      <button
        onClick={onSubmit}
        disabled={!hasMetrics}
        className="btn btn-primary w-full bg-gradient-to-r from-[#c62ef8] to-[#21e3b6] border-none"
      >
        Submit Review
      </button>
    </div>
  )
}
