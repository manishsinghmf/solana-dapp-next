"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";

export default function BalanceCard() {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const refreshBalance = async () => {
        if (!publicKey) return;
        setLoading(true);
        try {
            const lamports = await connection.getBalance(publicKey);
            setBalance(lamports / 1e9);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (publicKey) {
            (async () => {
                await refreshBalance();
            })();
        }
    }, [publicKey, connection]);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
            {!publicKey ? (
                <p className="text-slate-500 text-sm">
                    Connect your wallet to view balance
                </p>
            ) : (
                <>
                    <p className="text-sm text-slate-500 mb-1">Your Balance</p>

                    <p className="text-4xl font-semibold text-slate-900 mb-6">
                        {balance !== null ? balance.toFixed(6) : "—"}
                        <span className="text-xl text-slate-500 ml-2">SOL</span>
                    </p>
                    <button
                        onClick={refreshBalance}
                        disabled={loading}
                        className="
                            w-full
                            bg-slate-100 hover:bg-slate-200
                            disabled:opacity-60
                            text-slate-800
                            font-medium
                            py-2.5
                            rounded-lg
                            transition
                            flex items-center justify-center gap-2
                        "
                    >
                        {loading ? (
                            <>
                                <Spinner size={16} />
                                <span className="text-sm">Refreshing</span>
                            </>
                        ) : (
                            "Refresh Balance"
                        )}
                    </button>

                </>
            )}
        </div>
    );
}
