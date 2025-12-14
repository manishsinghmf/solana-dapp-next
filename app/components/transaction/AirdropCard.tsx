"use client";

import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";

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
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
            {!publicKey ? (
                <p className="text-slate-500 text-sm">
                    Connect your wallet to Request Airdrop
                </p>
            ) : (
                <>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                        Request Airdrop
                    </h3>

                    <p className="text-sm text-slate-500 mb-6">
                        Receive 1 SOL from the devnet faucet
                    </p>
                    <button
                        onClick={requestAirdrop}
                        disabled={loading || !publicKey}
                        className="
                            w-full
                            bg-purple-600 
                            hover:bg-purple-700 
                            disabled:bg-slate-300 
                            text-white font-medium
                            py-2.5
                            rounded-lg
                            transition
                            flex items-center justify-center gap-2
                        "
                    >
                        {loading ? (
                            <>
                                <Spinner size={16} />
                                <span className="text-sm">Requesting…</span>
                            </>
                        ) : (
                            "Request 1 SOL"
                        )}
                    </button>
                </>
            )}
        </div>
    );
}
