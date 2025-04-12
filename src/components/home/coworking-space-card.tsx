'use client'

import type React from 'react'

import { Building, Building2, BuildingIcon as BuildingSkyscraper, Home, Landmark } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SpaceDetailsPopup } from './space-details-popup'

export interface CoworkingSpace {
  id: number
  name: string
  icon: React.ReactNode
}

interface CoworkingSpaceCardProps {
  space: CoworkingSpace
}

export const coworkingSpaces: CoworkingSpace[] = [
  {
    id: 0,
    name: 'Lower Ground Coworking Space',
    icon: <Home className="h-8 w-8" />,
  },
  {
    id: 1,
    name: 'First Floor Coworking Space',
    icon: <Building className="h-8 w-8" />,
  },
  {
    id: 2,
    name: 'Second Floor Coworking Space with Terrace',
    icon: <Building2 className="h-8 w-8" />,
  },
  {
    id: 3,
    name: 'Second Floor Coworking Space (left)',
    icon: <Landmark className="h-8 w-8" />,
  },
  {
    id: 4,
    name: 'Third Floor Coworking Space',
    icon: <BuildingSkyscraper className="h-8 w-8" />,
  },
]

export function CoworkingSpaceCard({ space }: CoworkingSpaceCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const navigate = useNavigate()

  const handleReview = () => {
    navigate(`/review/${space.id}`)
  }

  return (
    <>
      <div
        className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="card-body items-center text-center">
          <div className="bg-gradient-to-r from-[#c62ef8] to-[#21e3b6] p-4 rounded-full mb-4">{space.icon}</div>
          <h2 className="card-title">{space.name}</h2>
          <p className="text-sm opacity-70">Click to view details</p>
        </div>
      </div>

      {showDetails && <SpaceDetailsPopup space={space} onClose={() => setShowDetails(false)} onReview={handleReview} />}
    </>
  )
}
