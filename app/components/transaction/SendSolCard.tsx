"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";

export default function SendSolCard() {
    const { publicKey, signTransaction } = useWallet();
    const { connection } = useConnection();

    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [txSig, setTxSig] = useState<string | null>(null);

    const sendSol = async () => {
        if (!publicKey) return toast.error("Connect your wallet first.");
        if (!recipient) return toast.error("Recipient address required.");
        if (amount <= 0) return toast.error("Amount must be greater than zero.");

        try {
            setLoading(true);
            const toastId = toast.loading("Preparing transaction…");

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(recipient),
                    lamports: amount * 1e9,
                })
            );

            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;

            const simulation = await connection.simulateTransaction(transaction);
            if (simulation.value.err) {
                console.log(simulation.value.err);
                throw new Error("Simulation failed. Check balance or recipient.");
            }
            const signed = await signTransaction!(transaction);
            const sig = await connection.sendRawTransaction(signed.serialize());

            await connection.confirmTransaction(sig, "confirmed");
            setTxSig(sig);

            toast.success("Transaction confirmed!", { id: toastId });

        } catch (error: any) {
            console.error("SEND SOL ERROR:", error);
            toast.error(error.message || "Transaction failed.");
        } finally {
            setLoading(false);
            setRecipient("");
            setAmount(0);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
            {!publicKey ? (
                <p className="text-slate-500 text-sm">
                    Connect your wallet to Send SOL
                </p>
            ) : (
                <>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                        Send SOL
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-slate-600">Recipient</label>
                            <input
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                placeholder="Public key"
                                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-slate-600">Amount (SOL)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            />
                        </div>

                        <button
                            onClick={sendSol}
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
                                    <span className="text-sm">Sending…</span>
                                </>
                            ) : (
                                "Send SOL"
                            )}
                        </button>

                        {txSig && (
                            <p className="text-sm text-slate-500">
                                View on Explorer:{" "}
                                <a
                                    href={`https://explorer.solana.com/tx/${txSig}?cluster=devnet`}
                                    target="_blank"
                                    className="text-purple-600 hover:underline"
                                >
                                    {txSig.slice(0, 6)}…{txSig.slice(-6)}
                                </a>
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
