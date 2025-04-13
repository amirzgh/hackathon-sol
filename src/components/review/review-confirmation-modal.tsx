'use client'

import { CheckCircle, Loader2, Power, Users, Volume2, Wifi, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { MetricsReview } from './review-feature'

interface ReviewConfirmationModalProps {
  metrics: MetricsReview
  onClose: () => void
  onConfirm: () => void
  submitting: boolean
  submitted: boolean
}

export function ReviewConfirmationModal({
  metrics,
  onClose,
  onConfirm,
  submitting,
  submitted,
}: ReviewConfirmationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && !submitting && !submitted) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose, submitting, submitted])

  // Format metrics for display
  const getWifiSpeedText = (value: number | null) => {
    if (value === null) return 'Not provided'
    const labels = ['Very Slow', 'Slow', 'Average', 'Fast', 'Very Fast']
    return labels[value - 1]
  }

  const getNoiseLevelText = (value: number | null) => {
    if (value === null) return 'Not provided'
    const labels = ['Very Quiet', 'Quiet', 'Moderate', 'Noisy', 'Very Noisy']
    return labels[value - 1]
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div ref={modalRef} className="bg-base-100 rounded-lg p-6 max-w-md w-full shadow-2xl animate-scaleIn">
        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="h-16 w-16 mx-auto text-success" />
            <h2 className="text-2xl font-bold">Review Submitted!</h2>
            <p>Thank you for your feedback.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Confirm Your Review</h2>
              {!submitting && (
                <button onClick={onClose} className="btn btn-ghost btn-circle">
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>

            <p className="mb-4">Please confirm that the following information is accurate:</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Wifi className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">WiFi Speed</p>
                  <p className="text-sm opacity-70">{getWifiSpeedText(metrics.internet_speed)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Noise Level</p>
                  <p className="text-sm opacity-70">{getNoiseLevelText(metrics.noise_level)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Crowdedness</p>
                  <p className="text-sm opacity-70">
                    {metrics.crowdedness !== null ? metrics.crowdedness : 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Power className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Sockets/Plugs Available</p>
                  <p className="text-sm opacity-70">
                    {metrics.charging_plug_availability !== null
                      ? metrics.charging_plug_availability
                        ? 'Yes'
                        : 'No'
                      : 'Not provided'}
                  </p>
                </div>
              </div>
            </div>

            <button onClick={onConfirm} disabled={submitting} className="btn btn-primary w-full">
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                'Confirm & Submit'
              )}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
