"use client";

import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";

export default function AirdropCard() {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [loading, setLoading] = useState(false);

    const requestAirdrop = async () => {
        if (!publicKey) {
            toast.error("Connect your wallet first.");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Requesting airdrop…");

        try {
            const sig = await connection.requestAirdrop(publicKey, 1e9);

            await connection.confirmTransaction(sig, "confirmed");

            toast.success("Airdrop successful!", { id: toastId });
        } catch (error) {
            console.error("Airdrop Error:", error);

            toast.error(
                "Airdrop failed. Devnet faucet may be rate-limited. Try again later.",
                { id: toastId }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-6 text-center">
            {!publicKey ? (
                <p className="text-gray-600">
                    Connect your wallet to request airdrop
                </p>
            ) : (
                <>
                    <h2 className="text-xl font-semibold mb-2">Request Airdrop</h2>

                    <button
                        onClick={requestAirdrop}
                        disabled={loading}
                        className={`w-full py-2 rounded-lg font-semibold text-white transition
                            ${loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}
                        `}
                    >
                        {loading ? "Requesting..." : "Request 1 SOL Airdrop"}
                    </button>
                </>
            )}
        </div>
    );
}
