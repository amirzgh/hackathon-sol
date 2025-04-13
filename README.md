# Cowork-Net
- **Event**: [Encode AI London 2025](https://lu.ma/AI-London-2025)
- **Bounty**: [Superteam UK](https://bento.me/superteamuk): Build an AI x blockchain solution
- **Authors**: [Polina](https://github.com/L1N-z), [Amir](https://github.com/amirzgh), [Farzaan](https://github.com/farzaanshaikh), [Loïc](https://github.com/PeronLo)


**Cowork-Net** is a blockchain-powered incentive and recommendation system for coworking spaces, powered by Solana and AI.

The platform allows users to discover and review coworking spaces, earning SOL tokens as a reward for contributing reviews and following personalized recommendations.

## How It Works

### 1. Submit Reviews & Earn SOL

Users visit coworking spaces and submit reviews based on predefined metrics like noise level, internet speed, and charging socket availability.
Each review is recorded as a unique Solana transaction, with the review details stored in the transaction memo.
For this proof of concept, rewards are distributed to a hard-coded wallet address within the application. In a future version, we plan to integrate Phantom wallet support for seamless, user-owned transactions.

### 2. AI-Powered Workspace Recommendations

Users can request personalized workspace recommendations by specifying a mix of hard preferences (e.g., "quiet", "fast internet") and a natural language description of their ideal environment.
The system aggregates reviews from the Solana blockchain, transforms them into a structured dataset, and uses the DeepSeek large language model to recommend the best-fit venue.
Users who take up a recommendation and submit a review for it also receive a SOL incentive.

### 3. Business-side

Businesses fund these incentives by purchasing SOL, which is then distributed to users through the app.
In return, businesses gain increased visibility through reviews and foot traffic driven by recommendations.

## Built With
### Tech stack
* [![Next][Next.js]][Next-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Vite][Vite]][Vite-url]
* [![Tailwind][Tailwind]][Tailwind-url]
* [![SolanaWeb3][SolanaWeb3]][SolanaWeb3-url]
* [![QuickNode][QuickNode]][QuickNode-url]

### Integrations
* **Solana Blockchain** — for storing coworking space reviews and handling SOL reward transactions.

* **Phantom Wallet** — for secure wallet connections, SOL transfers, and transaction signing.

* **DeepSeek LLM API** — for AI-powered coworking space recommendations based on user preferences and on-chain data.

## Getting started

1. Clone the repo
   ```sh
   git clone https://github.com/amirzgh/hackathon-sol.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the server
   ```sh
   npm run dev
   ```


## Usage
> insert images and text explanation
> optional: insert demo video (max 3 min) demonstrating functionalities


## Roadmap
### Technical
- [ ] Automate reviews for noise level, internet speed and more by using phone sensors and storing data on-chain
- [ ] Business-side dashboard for wallet and user management
- [ ] Support time-based data for user reviews
- [ ] Abuse prevention mechanisms for reviews and verification of venue visit
- [ ] Implement weighted bias for more recent reviews, number of reviews and maybe user reliability

### Business
- [ ] Expand the idea to other sectors (e.g. cafés, libraries, etc.)



<!-- LINKS -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/

[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/

[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/

[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/

[QuickNode]: https://img.shields.io/badge/QuickNode-563D7C?style=for-the-badge&logo=https://avatars.githubusercontent.com/u/53955811?s=200&v=4&logoColor=white
[QuickNode-url]: https://www.quicknode.com/

[DeepSeek]: https://img.shields.io/badge/DeepSeek-4B0082?style=for-the-badge&logo=quicknode&logoColor=white
[DeepSeek-url]: https://deepseek.com/

[SolanaWeb3]: https://img.shields.io/badge/Solana_Web3.js-9945FF?style=for-the-badge&logo=solana&logoColor=white
[SolanaWeb3-url]: https://solana-labs.github.io/solana-web3.js/
