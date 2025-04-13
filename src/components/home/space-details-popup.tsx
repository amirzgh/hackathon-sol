'use client'

import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { CoworkingSpace } from './coworking-space-card'
import photo1 from '@/graphics/photo_1a.jpg'
import photo2 from '@/graphics/photo_1b.jpg'

interface SpaceDetailsPopupProps {
  space: CoworkingSpace
  onClose: () => void
  onReview: () => void
}

export function SpaceDetailsPopup({ space, onClose, onReview }: SpaceDetailsPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  // Mock metrics data - in a real app, this would come from an API
  const hasMetrics = space.id % 2 === 0 // Just for demo purposes

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div ref={popupRef} className="bg-base-100 rounded-lg p-6 max-w-md w-full shadow-2xl animate-scaleIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{space.name}</h2>
          <button onClick={onClose} className="btn btn-ghost btn-circle">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Photo Gallery - Two square images side by side */}
        <div className="flex gap-2 mb-4">
          <div className="w-1/2 aspect-square rounded-lg overflow-hidden">
            <img src={photo1} alt={`${space.name} - Photo 1`} className="w-full h-full object-cover" />
          </div>
          <div className="w-1/2 aspect-square rounded-lg overflow-hidden">
            <img src={photo2} alt={`${space.name} - Photo 2`} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="divider"></div>

        {hasMetrics ? (
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold">Recent Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="stat bg-base-200 rounded-lg p-3">
                <div className="stat-title">Avg. WiFi Speed</div>
                <div className="stat-value text-lg">Good</div>
              </div>
              <div className="stat bg-base-200 rounded-lg p-3">
                <div className="stat-title">Noise Level</div>
                <div className="stat-value text-lg">Medium</div>
              </div>
              <div className="stat bg-base-200 rounded-lg p-3">
                <div className="stat-title">Crowdedness</div>
                <div className="stat-value text-lg">12</div>
              </div>
              <div className="stat bg-base-200 rounded-lg p-3">
                <div className="stat-title">Sockets</div>
                <div className="stat-value text-lg">Yes</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="alert mb-6">
            <span>No metrics available for this space yet.</span>
          </div>
        )}

        <button
          onClick={onReview}
          className="btn btn-primary w-full bg-gradient-to-r from-[#c62ef8] to-[#21e3b6] border-none"
        >
          Review This Space
        </button>
      </div>
    </div>
  )
}
