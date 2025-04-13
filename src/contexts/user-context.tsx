'use client'

import { createContext, useContext, useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'

type UserContextType = {
  walletPublicKey: PublicKey | undefined
  walletConnected: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { publicKey, connect, disconnect } = useWallet()
  const [walletConnected, setWalletConnected] = useState(false)

  const connectWallet = async () => {
    try {
      await connect()
      setWalletConnected(true)
    } catch (error) {
      console.error('Phantom connection failed:', error)
    }
  }

  const disconnectWallet = async () => {
    await disconnect()
    setWalletConnected(false)
  }

  return (
    <UserContext.Provider
      value={{
        walletPublicKey: publicKey || undefined,
        walletConnected,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
