"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export default function BalanceCard() {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState<number | null>(null);

    const fetchBalance = async () => {
        if (!publicKey) return;
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / 1e9); // Convert lamports to SOL
    }

    useEffect(() => {
        if (publicKey) {
            (async () => {
                await fetchBalance();
            })();
        }
    }, [publicKey, connection]);

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 text-center mt-6">
            {!publicKey ? (
                <p className="text-gray-600">Connect wallet to view balance</p>
            ) : (
                <>
                    <h2 className="text-xl font-semibold mb-2">Your Balance</h2>

                    <p className="text-4xl font-bold text-gray-800 mb-4">
                        {balance !== null ? `${balance} SOL` : "Loading..."}
                    </p>

                    <button
                        onClick={fetchBalance}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition font-semibold"
                    >
                        Refresh Balance
                    </button>
                </>
            )}
        </div>
    );
}