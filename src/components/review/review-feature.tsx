'use client'

import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { coworkingSpaces } from '../home/coworking-space-card'
import { MetricsBox } from './metrics-box'
import { ReviewConfirmationModal } from './review-confirmation-modal'
import { SubmitComponent } from './submit-component'
import { reviewer_transaction } from '@/functionalities/new'
import { useUser } from '@/contexts/user-context'
import { workspaceNames } from '@/data/venues'

export interface MetricsReview {
  internet_speed: number
  noise_level: number
  crowdedness: number
  charging_plug_availability: boolean
}

export default function ReviewFeature() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [metrics, setMetrics] = useState<MetricsReview>({
    internet_speed: 0,
    noise_level: 0,
    crowdedness: 0,
    charging_plug_availability: false,
  })
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { walletPublicKey } = useUser()
  const space = coworkingSpaces.find((s) => s.id === Number(id))

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        navigate('/')
        setTimeout(() => {
        }, 500)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [submitted, navigate])

  if (!space) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Space not found</h1>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    )
  }

  const handleSubmit = () => {
    if (!walletPublicKey) {
      return
    }
    setShowConfirmation(true)
  }

  const handleConfirm = async () => {
    if (!walletPublicKey) return

    setSubmitting(true)

    try {
      const workspaceId = parseInt(id ?? '0', 10)
      const metricsData = {
        venue: workspaceNames[workspaceId],
        metrics: {
          ...metrics,
          // Ensure values are within expected ranges
          internet_speed: Math.max(0, Math.min(10, metrics.internet_speed)),
          noise_level: Math.max(0, Math.min(10, metrics.noise_level)),
          crowdedness: Math.max(0, Math.min(10, metrics.crowdedness)),
        },
      }

      const transactionResult = await reviewer_transaction(
        walletPublicKey, // Use wallet public key instead of user ID
        workspaceId,
        metricsData,
      )

      if (transactionResult.success) {
        setSubmitted(true)
      } else {
        throw new Error(transactionResult.error || 'Transaction failed')
      }
    } catch (error) {
      console.error('Review submission error:', error)
    } finally {
      setSubmitting(false)
      setShowConfirmation(false)
    }
  }

  const handleUpdateMetric = (key: keyof MetricsReview, value: number | boolean) => {
    setMetrics((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleResetMetric = (key: keyof MetricsReview) => {
    const defaultValue = key === 'charging_plug_availability' ? false : 0
    setMetrics((prev) => ({
      ...prev,
      [key]: defaultValue,
    }))
  }

  const hasValidMetrics = Object.values(metrics).some((v) => v !== (typeof v === 'boolean' ? false : 0))

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl animate-fadeIn">
      <button onClick={() => navigate('/')} className="btn btn-ghost mb-6 flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </button>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-[#c62ef8] to-[#21e3b6] p-4 rounded-full">{space.icon}</div>
            <h1 className="text-2xl font-bold">{space.name}</h1>
          </div>

          <div className="divider"></div>

          <h2 className="text-xl font-semibold mb-4">Rate this space</h2>

          <MetricsBox metrics={metrics} onUpdateMetric={handleUpdateMetric} onResetMetric={handleResetMetric} />

          <div className="divider"></div>

          <SubmitComponent onSubmit={handleSubmit} hasMetrics={hasValidMetrics} walletConnected={!!walletPublicKey} />
        </div>
      </div>

      {showConfirmation && (
        <ReviewConfirmationModal
          metrics={metrics}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirm}
          submitting={submitting}
          submitted={submitted}
        />
      )}
    </div>
  )
}
