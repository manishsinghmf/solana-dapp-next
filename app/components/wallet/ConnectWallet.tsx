"use client";

import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
    async () =>
        (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    {
        ssr: false,
        loading: () => (
            <div className="h-10 w-36 rounded-lg bg-slate-200 animate-pulse" />
        ),
    }
);

export default function ConnectWallet() {
    return (
        <div className="flex justify-center my-6">
            <WalletMultiButton />
        </div>
    );
}
