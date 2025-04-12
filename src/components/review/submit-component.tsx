'use client'

import { Coins } from 'lucide-react'

interface SubmitComponentProps {
  onSubmit: () => void
  hasMetrics: boolean
}

export function SubmitComponent({ onSubmit, hasMetrics }: SubmitComponentProps) {
  // Calculate reward based on metrics provided or will we hardcode it eh?
  //   const solReward = hasMetrics ? 0.05 : 0;

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
