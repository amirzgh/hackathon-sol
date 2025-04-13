'use client'

import { Coffee, Loader2, Users, Volume, Wifi, X, Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { coworkingSpaces } from '../home/coworking-space-card'
import { askAI } from '@/hooks/use-workspace-recommendation'

interface SuggestionModalProps {
  onClose: () => void
}

type SuggestionState = 'input' | 'loading' | 'result'

interface Preferences {
  fastWifi: boolean
  quietSpace: boolean
  powerPlugs: boolean
  coffee: boolean
  largeGroup: boolean
  description: string
}

function hammingDistance(a: string, b: string): number {
  const len = Math.max(a.length, b.length)
  let dist = 0

  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) dist++
  }

  return dist
}

export function SuggestionModal({ onClose }: SuggestionModalProps) {
  const [state, setState] = useState<SuggestionState>('input')
  const [preferences, setPreferences] = useState<Preferences>({
    fastWifi: false,
    quietSpace: false,
    powerPlugs: false,
    coffee: false,
    largeGroup: false,
    description: '',
  })
  const [suggestedSpace, setSuggestedSpace] = useState<(typeof coworkingSpaces)[0] | null>(null)
  const [reasoning, setReasoning] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const handleCheckboxChange = (key: keyof Omit<Preferences, 'description'>) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSubmit = async () => {
    setState('loading')

    try {
      // Call askAI with the converted metrics
      const aiResultStr = await askAI(
        preferences.description, // user_request
        [
          preferences.powerPlugs ? 'charging_plugs' : '',
          preferences.quietSpace ? 'silent' : '',
          preferences.fastWifi ? 'high_internet_speed' : '',
          preferences.largeGroup ? 'low_crowdedness' : '',
        ].filter(Boolean), // requirements (filter out empty strings)
      )
      const aiResult = JSON.parse(aiResultStr)

      // If AI returned a result, use it to find the space
      if (aiResult && aiResult.venue) {
        const target = aiResult.venue.toLowerCase().trim()

        const space =
          coworkingSpaces.reduce((closest, current) => {
            const currentDistance = hammingDistance(current.name.toLowerCase().trim(), target)
            const closestDistance = hammingDistance(closest.name.toLowerCase().trim(), target)
            return currentDistance < closestDistance ? current : closest
          }, coworkingSpaces[0]) || coworkingSpaces[0]
        // const space = coworkingSpaces.find((s) => s.name === aiResult.venue) || coworkingSpaces[0]
        setSuggestedSpace(space)
        setReasoning(aiResult.reasoning || null)
        setState('result')
      } else {
        // Fallback to default selection if AI didn't return a valid result
        const spaceId = 0
        const space = coworkingSpaces.find((s) => s.id === spaceId) || coworkingSpaces[0]
        setSuggestedSpace(space)
        setReasoning(aiResult.reasoning || null)
        setState('result')
      }
    } catch (error) {
      console.error('AI recommendation failed:', error)
      // Fallback to default selection on error
      const spaceId = 0
      const space = coworkingSpaces.find((s) => s.id === spaceId) || coworkingSpaces[0]
      setSuggestedSpace(space)
      setReasoning(null)
      setState('result')
    }
  }

  const handleAccept = () => {
    if (suggestedSpace) {
      navigate(`/review/${suggestedSpace.id}`)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div ref={modalRef} className="bg-base-100 rounded-lg p-6 max-w-md w-full shadow-2xl animate-scaleIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Find Your Ideal Space</h2>
          <button onClick={onClose} className="btn btn-ghost btn-circle">
            <X className="h-6 w-6" />
          </button>
        </div>

        {state === 'input' && (
          <>
            <p className="mb-4">Select your requirements:</p>
            <div className="space-y-4 mb-6">
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={preferences.fastWifi}
                    onChange={() => handleCheckboxChange('fastWifi')}
                  />
                  <span className="label-text flex items-center gap-2">
                    <Wifi className="h-4 w-4" /> Fast WiFi
                  </span>
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={preferences.quietSpace}
                    onChange={() => handleCheckboxChange('quietSpace')}
                  />
                  <span className="label-text flex items-center gap-2">
                    <Volume className="h-4 w-4" /> Quiet Space
                  </span>
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={preferences.powerPlugs}
                    onChange={() => handleCheckboxChange('powerPlugs')}
                  />
                  <span className="label-text flex items-center gap-2">
                    <Zap className="h-4 w-4" /> Power Plugs
                  </span>
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={preferences.coffee}
                    onChange={() => handleCheckboxChange('coffee')}
                  />
                  <span className="label-text flex items-center gap-2">
                    <Coffee className="h-4 w-4" /> Coffee Available
                  </span>
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={preferences.largeGroup}
                    onChange={() => handleCheckboxChange('largeGroup')}
                  />
                  <span className="label-text flex items-center gap-2">
                    <Users className="h-4 w-4" /> Space for Large Group
                  </span>
                </label>
              </div>

              <p className="mb-4">What are you looking to do in the coworking space?</p>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tell us more about your needs (optional)</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="I need a space for..."
                  value={preferences.description}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, description: e.target.value }))}
                ></textarea>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="btn btn-primary w-full bg-gradient-to-r from-[#c62ef8] to-[#21e3b6] border-none"
            >
              Find the Best Space
            </button>
          </>
        )}

        {state === 'loading' && (
          <div className="py-12 flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg">Finding the perfect space for you...</p>
          </div>
        )}

        {state === 'result' && suggestedSpace && (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <p className="text-lg font-semibold mb-2">We recommend:</p>
              <div className="flex items-center justify-center gap-3">
                <div className="bg-gradient-to-r from-[#c62ef8] to-[#21e3b6] p-3 rounded-full">
                  {suggestedSpace.icon}
                </div>
                <h3 className="text-xl font-bold">{suggestedSpace.name}</h3>
              </div>
            </div>

            <div className="bg-base-200 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Why this space?</h4>
              <ul className="space-y-1 text-sm">
                {preferences.fastWifi && (
                  <li className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-primary" /> Reliable high-speed internet
                  </li>
                )}
                {preferences.quietSpace && (
                  <li className="flex items-center gap-2">
                    <Volume className="h-4 w-4 text-primary" /> Low noise environment
                  </li>
                )}
                {preferences.powerPlugs && (
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" /> Plenty of power outlets
                  </li>
                )}
                {preferences.coffee && (
                  <li className="flex items-center gap-2">
                    <Coffee className="h-4 w-4 text-primary" /> Coffee service available
                  </li>
                )}
                {preferences.largeGroup && (
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" /> Spacious for groups
                  </li>
                )}
                <li className="italic text-base-content/70 mt-2">
                  {preferences.description ? `"${preferences.description}"` : 'Based on your selected preferences'}
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button onClick={onClose} className="btn flex-1">
                Reject
              </button>
              <button
                onClick={handleAccept}
                className="btn btn-primary flex-1 bg-gradient-to-r from-[#c62ef8] to-[#21e3b6] border-none"
              >
                Accept & Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
