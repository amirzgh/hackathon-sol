'use client'

import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { SuggestionModal } from './suggestion-modal'

export function SuggestionPrompt() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="mt-8 text-center">
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-outline btn-lg gap-2 bg-base-200 hover:bg-base-300 border-2 border-dashed border-primary/50 hover:border-primary transition-all duration-300"
        >
          <Sparkles className="h-5 w-5 text-primary" />
          <span>Need a suggestion? Let us find the perfect space for you</span>
        </button>
      </div>

      {showModal && <SuggestionModal onClose={() => setShowModal(false)} />}
    </>
  )
}
