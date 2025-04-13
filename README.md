> following submission instructions [here](https://encodeclub.notion.site/Hackathon-Submissions-1ae6c123e77d815c8f1cc600cc14efd5)

# Cowork Connect
- **Event**: [Encode AI London 2025](https://lu.ma/AI-London-2025)
- **Bounty**: [Superteam UK](https://bento.me/superteamuk): Build an AI x blockchain solution
- **Authors**: [Polina](https://github.com/L1N-z), [Amir](https://github.com/amirzgh), [Farzaan](https://github.com/farzaanshaikh), [Loïc](https://github.com/PeronLo)


**Cowork Connect** is a decentralized incentive and recommendation system for coworking spaces, powered by Solana and AI.

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

### 3. Business Model

Businesses fund these incentives by purchasing SOL, which is then distributed to users through the app.
In return, businesses gain increased visibility through reviews and foot traffic driven by recommendations.

## Tech Highlights

**Solana blockchain**: Used to record review data via transaction memos and distribute SOL rewards.

**DeepSeek LLM**: Powers the AI recommender system by analyzing aggregated blockchain review data and matching it with user preferences.

## Built With
> replace with actual tech stack
* [![Next][Next.js]][Next-url]

## Getting started
> insert instructions for running it locally

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/L1N-z/BillsBoyzOnBlockchain.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. More steps


## Demo
> insert demo video (max 3 min) demonstrating functionalities (as per submission instructions)


## Roadmap
- [ ] Automate reviews for noise level, internet speed and more by using phone sensors and storing data on-chain
- [ ] Business-side dashboard for wallet and user management
- [ ] Support time-based data for user reviews
- [ ] Abuse prevention mechanisms for reviews and verification of venue visit
- [ ] Implement weighted bias for more recent reviews, number of reviews and maybe user reliability



<!-- LINKS -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
