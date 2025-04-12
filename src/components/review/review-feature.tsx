'use client'

import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { coworkingSpaces } from '../home/coworking-space-card'
import { MetricsBox } from './metrics-box'
import { ReviewConfirmationModal } from './review-confirmation-modal'
import { SubmitComponent } from './submit-component'
import { showToast } from './toast-notification'

export interface Metrics {
  wifiSpeed: number | null
  noiseLevel: number | null
  crowdedness: number | null
  socketsAvailable: boolean | null
}

export default function ReviewFeature() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [metrics, setMetrics] = useState<Metrics>({
    wifiSpeed: null,
    noiseLevel: null,
    crowdedness: null,
    socketsAvailable: null,
  })
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const space = coworkingSpaces.find((s) => s.id === Number(id))

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        navigate('/')
        // Show toast after navigation
        setTimeout(() => {
          showToast()
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
    setShowConfirmation(true)
  }

  const handleConfirm = () => {
    setSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1000)
  }

  const handleUpdateMetric = (key: keyof Metrics, value: Metrics[keyof Metrics]) => {
    setMetrics((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleResetMetric = (key: keyof Metrics) => {
    setMetrics((prev) => ({
      ...prev,
      [key]: null,
    }))
  }

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

          <SubmitComponent onSubmit={handleSubmit} hasMetrics={Object.values(metrics).some((v) => v !== null)} />
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
