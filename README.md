# Solana DApp

A decentralized application (dApp) built on the Solana blockchain, enabling users to connect their wallets, view balances, send SOL tokens, and request airdrops seamlessly.

**Demo**: [https://solana-dapp-pearl.vercel.app/](https://solana-dapp-pearl.vercel.app/)

## Why This Project is Useful

- **Fast Transactions**: Leverages Solana's high-speed blockchain for quick and cost-effective transactions.
- **User-Friendly Interface**: Simple and intuitive UI for wallet connection, balance viewing, and token transfers.
- **Developer-Friendly**: Modular and well-structured codebase for easy customization and extension.

## Key Features

- **Wallet Integration**: Supports Phantom and Solflare wallets via `@solana/wallet-adapter`.
- **Balance Viewer**: Displays the user's SOL balance in real-time.
- **Token Transfers**: Allows users to send SOL tokens to other wallets.
- **Airdrop Requests**: Enables users to request 1 SOL airdrop on the devnet.

## Project structure

   ```bash
   src/
    ├── components/
    │     ├── wallet/
    │     │     ├── ConnectWallet.tsx
    │     ├── balance/
    │     │     ├── BalanceCard.tsx
    │     ├── transaction/
    │     │     ├── SendSolCard.tsx
    │     │     ├── AirdropCard.tsx
    │     ├── ui/
    │     │     ├── BalanceCard.tsx
    │
    ├── page.tsx
    ├── layout.tsx
    ├── providers.tsx
    ├── toaster-provider.tsx
    ├── global.css
   ```

## Tech Stack

- Next.js
- Vite
- Tailwind CSS v4
- Solana Wallet Adapter
- @solana/web3.js
- react-hot-toast

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/manishsinghmf/solana-dapp-next.git
   cd solana-dapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser:
   ```bash
   http://localhost:3000/
   ```

## Usage
1. **Connect Wallet**: Click the "Connect Wallet" button to link your Phantom or Solflare wallet.
2. **View Balance**: Your SOL balance will be displayed after connecting your wallet.
3. **Send SOL**: Enter the recipient's public key and the amount of SOL to send, then click "Send."
4. **Request Airdrop**: Click the "Request 1 SOL Airdrop" button to receive SOL on the devnet.

## Example
   ```bash
   # Start the app
    npm run dev

    # Interact with the dApp:
    # - Connect your wallet
    # - View your balance
    # - Send SOL tokens
    # - Request an airdrop
   ```

## Support
For help or questions, refer to the following resources:


[Solana Documentation](https://docs.solana.com/)

[Wallet Adapter Guide](https://github.com/anza-xyz/wallet-adapter)

[React Hot Toast Documentation](https://react-hot-toast.com/)

## Maintainers and Contributions
This project is maintained by [Manish](https://github.com/manishsinghmf). Contributions are welcome!.

## License

[MIT](https://choosealicense.com/licenses/mit/)