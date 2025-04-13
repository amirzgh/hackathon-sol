'use client'

import { Wallet } from 'lucide-react'
import { useRef, useState } from 'react'
import { useUser } from '@/contexts/user-context'
import { useGetBalance } from '@/components/account/account-data-access'
import { AccountButtons } from '@/components/account/account-ui'

export function UserProfileButton() {
  const [showProfile, setShowProfile] = useState(false)
  const { walletPublicKey, walletConnected, connectWallet, disconnectWallet } = useUser()
  const profileRef = useRef<HTMLDivElement>(null)

  const { data: balance, isLoading } = useGetBalance({
    address: walletConnected ? walletPublicKey : undefined,
  })

  const formattedBalance = (balance ? balance / 1_000_000_000 : 0).toFixed(2)

  return (
    <div className="relative">
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="btn btn-circle btn-ghost"
        aria-label="Wallet profile"
      >
        <Wallet className="h-5 w-5" />
      </button>

      {showProfile && (
        <div
          ref={profileRef}
          className="absolute right-0 mt-2 w-64 bg-base-200 rounded-lg shadow-xl z-50 animate-fadeIn"
        >
          <div className="p-4">
            {walletConnected ? (
              <>
                <div className="flex items-center gap-3 mb-3 p-2 bg-base-300 rounded-lg">
                  <div className="avatar placeholder">
                    <div className="w-10 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195]">
                      <span className="text-white text-sm">PH</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">Phantom Wallet</h3>
                    <p className="text-xs opacity-70">
                      {walletPublicKey?.toString().slice(0, 4)}...
                      {walletPublicKey?.toString().slice(-4)}
                    </p>
                  </div>
                </div>

                <div className="divider my-1"></div>

                <div className="mb-2">
                  <p className="text-sm opacity-70">Wallet Balance</p>
                  <p className="font-bold flex items-center gap-1">
                    {isLoading ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <span>{formattedBalance} SOL</span>
                    )}
                  </p>
                </div>

                {walletPublicKey && (
                  <div className="my-2">
                    <AccountButtons address={walletPublicKey} />
                  </div>
                )}

                <div className="divider my-1"></div>

                <button onClick={disconnectWallet} className="btn btn-sm btn-outline w-full">
                  Disconnect Phantom
                </button>
              </>
            ) : (
              <button onClick={connectWallet} className="btn btn-primary w-full gap-2">
                <Wallet className="h-4 w-4" />
                Connect Phantom
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
