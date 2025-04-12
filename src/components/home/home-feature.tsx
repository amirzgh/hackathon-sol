'use client'

import { CoworkingSpaceCard, coworkingSpaces } from './coworking-space-card'
import { SuggestionPrompt } from '../suggestions/suggestion-prompt'

export default function HomeFeature() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Coworking Spaces</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coworkingSpaces.map((space) => (
          <CoworkingSpaceCard key={space.id} space={space} />
        ))}
      </div>
      <SuggestionPrompt />
    </div>
  )
}
