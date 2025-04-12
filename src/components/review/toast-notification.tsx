"use client"

import { Coins, X } from "lucide-react"
import { createRoot } from "react-dom/client"

export function showToast() {
  // Create container if it doesn't exist
  let container = document.getElementById("toast-container")
  if (!container) {
    container = document.createElement("div")
    container.id = "toast-container"
    container.className = "fixed bottom-4 right-4 z-50"
    document.body.appendChild(container)
  }

  // Create a div for this specific toast
  const toastDiv = document.createElement("div")
  container.appendChild(toastDiv)

  // Render the toast into the div
  const root = createRoot(toastDiv)
  root.render(
    <ToastNotification
      onClose={() => {
        root.unmount()
        container?.removeChild(toastDiv)
      }}
    />,
  )

  // Auto-remove after 4 seconds
  setTimeout(() => {
    root.unmount()
    container?.removeChild(toastDiv)
  }, 4000)
}

interface ToastNotificationProps {
  onClose: () => void
}

function ToastNotification({ onClose }: ToastNotificationProps) {
  return (
    <div className="bg-success text-success-content rounded-lg shadow-lg p-4 mb-3 flex items-center gap-3 animate-slideUp w-72">
      <div className="bg-success-content/20 rounded-full p-2">
        <Coins className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <h3 className="font-bold">Transaction Successful!</h3>
        <p className="text-sm">You received 0.05 SOL for your review.</p>
      </div>
      <button onClick={onClose} className="btn btn-ghost btn-circle btn-sm">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
