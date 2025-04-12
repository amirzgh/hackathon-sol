'use client'

import { User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type UserProfile = {
  id: number
  name: string
  initials: string
  colorFrom: string
  colorTo: string
}

export function UserProfileButton() {
  const [showProfile, setShowProfile] = useState(false)
  const [activeUser, setActiveUser] = useState<UserProfile>({
    id: 0,
    name: 'Bill',
    initials: 'B',
    colorFrom: '#c62ef8',
    colorTo: '#21e3b6',
  })
  const profileRef = useRef<HTMLDivElement>(null)

  const users: UserProfile[] = [
    {
      id: 0,
      name: 'Bill',
      initials: 'B',
      colorFrom: '#c62ef8',
      colorTo: '#21e3b6',
    },
    {
      id: 1,
      name: 'Nick',
      initials: 'N',
      colorFrom: '#818dd3',
      colorTo: '#5eadc8',
    },
    {
      id: 2,
      name: 'Cap',
      initials: 'C',
      colorFrom: '#21e3b6',
      colorTo: '#c62ef8',
    },
    {
      id: 3,
      name: 'EncodeBot',
      initials: 'E',
      colorFrom: '#5eadc8',
      colorTo: '#818dd3',
    },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleUserSwitch = (user: UserProfile) => {
    setActiveUser(user)
    setShowProfile(false)
  }

  return (
    <div className="relative">
      <button onClick={() => setShowProfile(!showProfile)} className="btn btn-circle btn-ghost">
        <User className="h-6 w-6" />
      </button>

      {showProfile && (
        <div
          ref={profileRef}
          className="absolute right-0 mt-2 w-64 bg-base-200 rounded-lg shadow-xl z-50 animate-fadeIn"
        >
          <div className="p-4">
            {/* Active User */}
            <div className="flex items-center gap-3 mb-3 p-2 bg-base-300 rounded-lg">
              <div className="avatar">
                <div
                  className="w-10 rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${activeUser.colorFrom}, ${activeUser.colorTo})`,
                  }}
                >
                  <span className="text-sm text-white font-bold flex items-center justify-center h-full">
                    {activeUser.initials}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-bold">{activeUser.name}</h3>
              </div>
            </div>

            <div className="divider my-1"></div>

            {/* Other Users */}
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {users
                .filter((u) => u.id !== activeUser.id)
                .map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleUserSwitch(user)}
                    className="flex items-center gap-3 w-full p-2 hover:bg-base-300 rounded-lg transition-colors"
                  >
                    <div className="avatar">
                      <div
                        className="w-8 rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${user.colorFrom}, ${user.colorTo})`,
                        }}
                      >
                        <span className="text-xs text-white font-bold flex items-center justify-center h-full">
                          {user.initials}
                        </span>
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-medium">{user.name}</h3>
                    </div>
                  </button>
                ))}
            </div>

            <div className="divider my-1"></div>

            {/* Wallet and Sign Out */}
            <div className="mb-2">
              <p className="text-sm opacity-70">Wallet Balance</p>
              <p className="font-bold flex items-center gap-1">
                <span>2.45 SOL</span>
              </p>
            </div>

            <button className="btn btn-sm btn-outline w-full mt-2">Sign Out</button>
          </div>
        </div>
      )}
    </div>
  )
}
