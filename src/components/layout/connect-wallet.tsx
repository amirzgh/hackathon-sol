import { Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';

const getProvider = () => {
  if ('phantom' in window) {
    const provider = window.phantom?.solana;
    if (provider?.isPhantom) {
      return provider;
    }
  }
  return null;
};

function ConnectWallet() {
  const [provider, setProvider] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userPubKey, setUserPubKey] = useState(null);

  // Set provider on initial load
  useEffect(() => {
    setProvider(getProvider());
  }, []);

  // Listen to connection state
  useEffect(() => {
    if (provider?.isConnected && provider.publicKey) {
      setIsWalletConnected(true);
      setUserPubKey(provider.publicKey.toString());
    } else {
      setIsWalletConnected(false);
      setUserPubKey(null);
    }
  }, [provider]);

  // Handle disconnect event
  useEffect(() => {
    if (provider) {
      provider.on("disconnect", () => {
        setIsWalletConnected(false);
        setUserPubKey(null);
      });
    }
  }, [provider]);

  async function connectWallet() {
    try {
      const resp = await provider.connect();
      setUserPubKey(resp.publicKey.toString());
      setIsWalletConnected(true);
    } catch (err) {
      console.warn("Connection failed:", err);
    }
  }

  async function disconnectWallet() {
    try {
      await provider.disconnect();
      setIsWalletConnected(false);
      setUserPubKey(null);
    } catch (err) {
      console.error("Error disconnecting wallet:", err);
    }
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <Wallet className="w-5 h-5" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-4 shadow-lg bg-base-200 rounded-box w-64"
      >
        {isWalletConnected ? (
          <li className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Wallet</span>
              <span className="badge badge-success">Connected</span>
            </div>
            <div className="text-xs text-gray-500 break-all">
              {userPubKey}
            </div>
            <button
              onClick={disconnectWallet}
              className="btn btn-outline btn-error w-full"
            >
              Disconnect
            </button>
          </li>
        ) : (
          <li>
            <button
              onClick={connectWallet}
              className="btn btn-primary w-full"
            >
              Connect Wallet
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export { ConnectWallet };
