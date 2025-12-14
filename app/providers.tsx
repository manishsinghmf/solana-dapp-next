"use client";

import { ReactNode, useMemo } from "react";
import {
    ConnectionProvider,
    WalletProvider
} from "@solana/wallet-adapter-react";

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import { Cluster, clusterApiUrl } from "@solana/web3.js";

// Required for wallet modal styling
import "@solana/wallet-adapter-react-ui/styles.css";

export default function Providers({ children }: { children: ReactNode }) {
    // Choose the Solana cluster and endpoint
    const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK as Cluster) || "devnet";
    const endpoint =
        process.env.NEXT_PUBLIC_SOLANA_RPC ||
        clusterApiUrl(network);

    // Wallet adapters (memoized for performance)
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
