'use client'

import { useMemo, type ReactNode } from 'react'
import { ThemeToggle } from './theme-toggle'
import { UserProfileButton } from './user-profile'
import { UserProvider } from '@/contexts/user-context'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { clusterApiUrl } from '@solana/web3.js'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const network = WalletAdapterNetwork.Devnet // currently using
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    [network]
  )
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <UserProvider>
            <div className="min-h-screen flex flex-col">
              <header className="navbar bg-base-300">
                <div className="container mx-auto">
                  <div className="flex-1">
                    <a href="/" className="btn btn-ghost normal-case text-xl">
                      Cowork-Net
                    </a>
                  </div>
                  <div className="flex-none gap-2">
                    <ThemeToggle />
                    <UserProfileButton />
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
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
