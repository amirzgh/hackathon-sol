'use client'

import type { ReactNode } from 'react'
import { ThemeToggle } from './theme-toggle'
import { UserProfileButton } from './user-profile'
import { UserProvider } from '@/contexts/user-context'
import { ConnectWallet } from './connect-wallet'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <UserProvider>
      <div className="min-h-screen flex flex-col">
        <header className="navbar bg-base-300">
          <div className="container mx-auto">
            <div className="flex-1">
              <a href="/" className="btn btn-ghost normal-case text-xl">
                Cowork-Net
              </a>
            </div>
            <div className="flex gap-2">
              <ThemeToggle />
              <UserProfileButton />
              <ConnectWallet />
            </div>
          </div>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
          <div>
            <p>© 2025 Cowork-Net - Powered by Solana</p>
          </div>
        </footer>
      </div>
    </UserProvider>
  )
}
