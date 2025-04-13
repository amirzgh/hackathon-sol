'use client'

import { HelpCircle, Wifi, Volume2, Users, Power, X } from 'lucide-react'
import type { MetricsReview } from './review-feature'

interface MetricsReviewBoxProps {
  metrics: MetricsReview
  onUpdateMetric: <K extends keyof MetricsReview>(key: K, value: MetricsReview[K]) => void
  onResetMetric: (key: keyof MetricsReview) => void
}

export function MetricsBox({ metrics, onUpdateMetric, onResetMetric }: MetricsReviewBoxProps) {
  return (
    <div className="space-y-6">
      {/* WiFi Speed */}
      <div className="bg-base-300 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-[#c62ef8]" />
            <h3 className="font-medium">WiFi Speed</h3>
            <div className="dropdown dropdown-hover">
              <label tabIndex={0}>
                <HelpCircle className="h-4 w-4 text-base-content/60 cursor-help" />
              </label>
              <div tabIndex={0} className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <p className="text-sm">Rate the WiFi speed from slow to fast</p>
              </div>
            </div>
          </div>
          {metrics.internet_speed !== null && (
            <button onClick={() => onResetMetric('internet_speed')} className="btn btn-ghost btn-xs">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <input
          type="range"
          min="0"
          max="10"
          value={metrics.internet_speed || 3}
          onChange={(e) => onUpdateMetric('internet_speed', Number.parseInt(e.target.value))}
          className="range range-primary range-sm"
          step="0"
        />
        <div className="flex justify-between text-xs px-2">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>

      {/* Noise Level */}
      <div className="bg-base-300 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-[#818dd3]" />
            <h3 className="font-medium">Noise Level</h3>
            <div className="dropdown dropdown-hover">
              <label tabIndex={0}>
                <HelpCircle className="h-4 w-4 text-base-content/60 cursor-help" />
              </label>
              <div tabIndex={0} className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <p className="text-sm">Rate the noise level from quiet to loud</p>
              </div>
            </div>
          </div>
          {metrics.noise_level !== null && (
            <button onClick={() => onResetMetric('noise_level')} className="btn btn-ghost btn-xs">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <input
          type="range"
          min="0"
          max="10"
          value={metrics.noise_level || 0}
          onChange={(e) => onUpdateMetric('noise_level', Number.parseInt(e.target.value))}
          className="range range-primary range-sm"
          step="0"
        />
        <div className="flex justify-between text-xs px-2">
          <span>Quiet</span>
          <span>Loud</span>
        </div>
      </div>

      {/* Crowdedness */}
      <div className="bg-base-300 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#5eadc8]" />
            <h3 className="font-medium">Crowdedness</h3>
            <div className="dropdown dropdown-hover">
              <label tabIndex={0}>
                <HelpCircle className="h-4 w-4 text-base-content/60 cursor-help" />
              </label>
              <div tabIndex={0} className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <p className="text-sm">How crowded it feels</p>
              </div>
            </div>
          </div>
          {metrics.crowdedness !== null && (
            <button onClick={() => onResetMetric('crowdedness')} className="btn btn-ghost btn-xs">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <input
          type="range"
          min="0"
          max="10"
          value={metrics.crowdedness || 0}
          onChange={(e) => onUpdateMetric('crowdedness', Number.parseInt(e.target.value))}
          className="range range-primary range-sm"
          step="1"
        />
      </div>

      {/* Sockets Available */}
      <div className="bg-base-300 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Power className="h-5 w-5 text-[#21e3b6]" />
            <h3 className="font-medium">Sockets/Plugs Available</h3>
            <div className="dropdown dropdown-hover">
              <label tabIndex={0}>
                <HelpCircle className="h-4 w-4 text-base-content/60 cursor-help" />
              </label>
              <div tabIndex={0} className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <p className="text-sm">Are there power sockets available?</p>
              </div>
            </div>
          </div>
          {metrics.charging_plug_availability !== null && (
            <button onClick={() => onResetMetric('charging_plug_availability')} className="btn btn-ghost btn-xs">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex gap-4">
          <button
            className={`btn flex-1 ${metrics.charging_plug_availability === true ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => onUpdateMetric('charging_plug_availability', true)}
          >
            Yes
          </button>
          <button
            className={`btn flex-1 ${metrics.charging_plug_availability === false ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => onUpdateMetric('charging_plug_availability', false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}
