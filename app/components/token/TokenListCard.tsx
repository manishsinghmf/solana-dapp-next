/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";
import { getWalletTokens } from "@/app/lib/solana/getWalletTokens";
import TransferTokenCard from "./TransferTokenCard";

type TokenInfo = {
    mint: string;
    amount: number;
    decimals: number;
};

export default function TokenListCard() {
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const [tokens, setTokens] = useState<TokenInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeMint, setActiveMint] = useState<string | null>(null);

    const fetchTokens = async () => {
        if (!publicKey) return;

        try {
            setLoading(true);
            const data = await getWalletTokens(
                connection,
                publicKey
            );
            setTokens(data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch tokens");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTokens();
    }, [publicKey]);

    return (
        <div className="bg-white rounded-2xl border p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                    My Tokens
                </h3>
                <button
                    onClick={fetchTokens}
                    className="text-sm text-purple-600 hover:underline"
                >
                    Refresh
                </button>
            </div>

            {!publicKey && (
                <p className="text-sm text-slate-500">
                    Connect wallet to view tokens
                </p>
            )}

            {loading && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Spinner size={14} />
                    Loading tokens…
                </div>
            )}

            {!loading && tokens.length === 0 && publicKey && (
                <p className="text-sm text-slate-500">
                    No tokens found
                </p>
            )}

            <ul className="space-y-3">
                {tokens.map((token) => (
                    <li
                        key={token.mint}
                        className="border rounded-lg p-4"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-sm text-slate-600">
                                    Mint
                                </div>

                                <a
                                    href={`https://explorer.solana.com/address/${token.mint}?cluster=devnet`}
                                    target="_blank"
                                    className="text-purple-600 hover:underline break-all text-sm"
                                >
                                    {token.mint}
                                </a>

                                <div className="mt-2 text-sm">
                                    Balance:{" "}
                                    <span className="font-medium">
                                        {token.amount}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() =>
                                    setActiveMint(
                                        activeMint === token.mint
                                            ? null
                                            : token.mint
                                    )
                                }
                                className="text-sm text-purple-600 hover:underline"
                            >
                                Transfer
                            </button>
                        </div>

                        {activeMint === token.mint && (
                            <div className="mt-4 border-t pt-4">
                                <TransferTokenCard
                                    mintAddress={token.mint}
                                    decimals={token.decimals}
                                />
                            </div>
                        )}
                    </li>
                ))}
            </ul>

        </div>
    );
}
