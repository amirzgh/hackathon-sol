import { Metrics } from '@/types/metrics'
import * as web3 from '@solana/web3.js'
import { PublicKey } from '@solana/web3.js'

import { REVIEWER_AMOUNT } from '../data/constants'

// const CONSUMER = '5gDR1bJHmuBQg74svbMLdrdvBgKPHpJAa1P6QrFL4x6Q'
export const WORKSPACES = [
  Uint8Array.from([
    234, 189, 237, 248, 188, 42, 103, 162, 67, 204, 67, 55, 49, 86, 14, 144, 13, 42, 211, 94, 39, 79, 180, 83, 233, 2,
    145, 73, 207, 49, 107, 196, 176, 86, 187, 225, 192, 123, 16, 14, 11, 166, 232, 113, 194, 55, 156, 238, 155, 96, 10,
    35, 155, 159, 47, 236, 132, 5, 10, 114, 233, 176, 62, 163,
  ]),
  Uint8Array.from([
    181, 168, 190, 117, 203, 154, 12, 90, 220, 37, 92, 79, 176, 112, 115, 61, 27, 17, 169, 85, 96, 148, 251, 183, 231,
    4, 192, 108, 234, 7, 76, 165, 33, 215, 7, 235, 176, 39, 140, 217, 66, 208, 142, 180, 13, 236, 105, 164, 236, 3, 33,
    27, 179, 131, 24, 224, 195, 51, 210, 234, 61, 70, 84, 58,
  ]),
  Uint8Array.from([
    175, 9, 196, 80, 123, 148, 189, 178, 12, 214, 151, 85, 184, 85, 82, 202, 219, 184, 33, 148, 44, 194, 42, 56, 98,
    115, 172, 139, 134, 173, 237, 203, 36, 211, 77, 195, 57, 238, 86, 236, 122, 200, 217, 89, 206, 181, 23, 248, 72, 45,
    31, 244, 236, 65, 10, 37, 151, 87, 188, 70, 119, 27, 120, 130,
  ]),
  Uint8Array.from([
    110, 144, 176, 174, 153, 13, 51, 97, 145, 52, 253, 44, 25, 31, 61, 46, 96, 155, 227, 217, 229, 166, 88, 230, 152,
    135, 121, 180, 180, 136, 205, 237, 37, 21, 41, 43, 96, 93, 3, 238, 227, 198, 170, 102, 189, 56, 155, 247, 216, 118,
    88, 252, 50, 236, 19, 177, 142, 152, 237, 200, 172, 44, 232, 77,
  ]),
  Uint8Array.from([
    193, 42, 13, 235, 163, 189, 170, 253, 164, 148, 8, 84, 155, 61, 250, 194, 58, 20, 37, 120, 206, 226, 28, 125, 213,
    223, 210, 137, 120, 49, 77, 181, 13, 207, 160, 51, 76, 226, 26, 228, 43, 73, 186, 61, 166, 67, 186, 110, 164, 199,
    103, 67, 122, 241, 248, 161, 184, 217, 132, 42, 14, 87, 89, 42,
  ]),
]

export const REVIEWERS = [
  '89UwaxCqWu6r9TUyJA27sSHHK2MZ8cMSQWPu228Lkh2z',
  'fEaMmKr3ukF1zsmBNuXYUmisE9x8CGX5rMCmEcmGLSt',
  'WSR85yUjhFuyDvGpg5CADqy4rKEnNFasYweMQSYge1a',
]

// Connect to QuickNode endpoint
const connection = new web3.Connection(
  'https://withered-skilled-bush.solana-devnet.quiknode.pro/fde767e761a49b21b8fbd6d572b879ceff398b7d/',
  'confirmed',
)
// const message = "This is a memo"; // Define your memo message here

async function reviewer_transaction(
  reviewer: PublicKey,
  sender: number,
  metrics?: Metrics,
  amount: number = REVIEWER_AMOUNT,
): Promise<{ success: boolean; signature?: string; error?: string }> {
  try {
    const secretKey = Uint8Array.from(WORKSPACES[sender])
    const senderKeypair = web3.Keypair.fromSecretKey(secretKey)
    const senderPubKey = senderKeypair.publicKey

    // Validate sender exists
    if (!WORKSPACES[sender]) {
      throw new Error(`Sender workspace ${sender} not found`)
    }

    // Validate reviewer exists
    if (!reviewer) {
      throw new Error(`Reviewer ${reviewer} not found`)
    }

    const receiverPubKey = new web3.PublicKey(reviewer)
    const message = JSON.stringify(metrics)

    const transaction = new web3.Transaction()

    // 1. Add transfer instruction
    transaction.add(
      web3.SystemProgram.transfer({
        fromPubkey: senderPubKey,
        toPubkey: receiverPubKey,
        lamports: web3.LAMPORTS_PER_SOL * amount, // 0.05 by default SOL
      }),
    )

    // 2. Add memo instruction
    if (metrics) {
      transaction.add(
        new web3.TransactionInstruction({
          keys: [{ pubkey: senderPubKey, isSigner: true, isWritable: true }],
          data: Buffer.from(message, 'utf-8'),
          programId: new web3.PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
        }),
      )
    }

    // Send transaction
    const signature = await web3.sendAndConfirmTransaction(connection, transaction, [senderKeypair])

    console.log(`Transaction successful! Signature: ${signature}`)
    return { success: true, signature }
  } catch (error) {
    console.error('Transaction failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown transaction error',
    }
  }
}

async function getAllReviews() {
  const allReviews: Record<number, Metrics[]> = {}

  for (let i = 0; i < 5; i++) {
    // Loop through all 5 venues (0-4)
    try {
      const reviews = await getReviews(i)
      allReviews[i] = reviews
      console.log(`Fetched ${reviews.length} reviews for venue ${i}`)
    } catch (error) {
      console.error(`Error fetching reviews for venue ${i}:`, error)
      allReviews[i] = [] // Store empty array if there's an error
    }
  }

  // Convert to JSON and save to file (Node.js environment)
  const jsonContent = JSON.stringify(allReviews, null, 2)

  // In a browser environment, you would download it like this:
  const blob = new Blob([jsonContent], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'venue_metrics.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  return allReviews
}

// Modified getReviews function to properly return Promise
async function getReviews(workspace: number): Promise<Metrics[]> {
  const secretKey = Uint8Array.from(WORKSPACES[workspace])
  const senderKeypair = web3.Keypair.fromSecretKey(secretKey)
  const senderPubKey = senderKeypair.publicKey

  const solana = new web3.Connection(
    'https://withered-skilled-bush.solana-devnet.quiknode.pro/fde767e761a49b21b8fbd6d572b879ceff398b7d/',
  )

  const publicKey = new web3.PublicKey(senderPubKey)
  const response = await solana.getSignaturesForAddress(publicKey, { limit: 5 })

  const memos = response
    .map((signatureInfo) => {
      if (signatureInfo.memo) {
        const raw = signatureInfo.memo.trim()
        const jsonString = raw.replace(/^\[\d+\]\s*/, '')

        try {
          return JSON.parse(jsonString) as Metrics
        } catch (err) {
          console.error(`Error parsing memo for venue ${workspace}:`, err)
          return null
        }
      }
      return null
    })
    .filter((m): m is Metrics => m !== null)

  return memos
}

// function getReviews(workspace: number) {
//   const secretKey = Uint8Array.from(WORKSPACES[workspace])
//   const senderKeypair = web3.Keypair.fromSecretKey(secretKey)
//   const senderPubKey = senderKeypair.publicKey

//   ;(async () => {
//     const solana = new web3.Connection(
//       'https://withered-skilled-bush.solana-devnet.quiknode.pro/fde767e761a49b21b8fbd6d572b879ceff398b7d/',
//     )
//     const publicKey = new web3.PublicKey(senderPubKey)
//     const response = await solana.getSignaturesForAddress(publicKey, { limit: 5 })

//     const memos = response
//       .map((signatureInfo) => {
//         if (signatureInfo.memo) {
//           const raw = signatureInfo.memo.trim()
//           const jsonString = raw.replace(/^\[\d+\]\s*/, '')

//           try {
//             const metrics: Metrics = JSON.parse(jsonString)
//             return metrics
//           } catch (err) {
//             // Not a valid JSON, ignore
//             console.log(err)
//           }
//         }
//       })
//       .filter((m): m is Metrics => m !== undefined)

//     return memos
//   })()
// }

export { reviewer_transaction, getAllReviews }
