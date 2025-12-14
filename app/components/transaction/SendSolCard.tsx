/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import toast from "react-hot-toast";

export default function SendSolCard() {
    const { publicKey, signTransaction } = useWallet();
    const { connection } = useConnection();

    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [txSig, setTxSig] = useState<string | null>(null);

    const sendSol = async () => {
        if (!publicKey) {
            toast.error("Connect your wallet first.");
            return;
        }

        if (!recipient) {
            toast.error("Enter a recipient address.");
            return;
        }

        try {
            const toPubkey = new PublicKey(recipient);

            if (amount <= 0) {
                toast.error("Amount must be greater than 0.");
                return;
            }

            setLoading(true);
            const toastId = toast.loading("Preparing transaction…");

            // 1. Build the transaction
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey,
                    lamports: amount * 1e9,
                })
            );

            // 2. Get recent blockhash
            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;

            // 3. Optional: simulate transaction for early error checking
            const simulation = await connection.simulateTransaction(transaction);
            if (simulation.value.err) {
                console.log(simulation.value.err);
                throw new Error("Simulation failed. Check balance or recipient.");
            }

            toast.loading("Waiting for wallet signature…", { id: toastId });

            // 4. Sign transaction
            const signedTx = await signTransaction!(transaction);

            toast.loading("Sending transaction…", { id: toastId });

            // 5. Send raw transaction
            const signature = await connection.sendRawTransaction(signedTx.serialize());

            // 6. Confirm transaction
            await connection.confirmTransaction(signature, "confirmed");

            setTxSig(signature);
            toast.success("Transaction confirmed!", { id: toastId });

        } catch (error: any) {
            console.error("SEND SOL ERROR:", error);
            toast.error(error.message || "Transaction failed.");
        } finally {
            setLoading(false);
            setAmount(0);
            setRecipient("");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-6 text-center">
            {!publicKey ? (
                <p className="text-gray-600">Connect wallet to send SOL</p>
            ) : (
                <>
                    <h2 className="text-xl font-semibold mb-4">Send SOL</h2>

                    <input
                        type="text"
                        placeholder="Recipient Public Key"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg mb-3"
                    />

                    <input
                        type="number"
                        placeholder="Amount (SOL)"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full px-3 py-2 border rounded-lg mb-4"
                    />

                    <button
                        onClick={sendSol}
                        disabled={loading}
                        className={`w-full py-2 rounded-lg font-semibold text-white transition
                            ${loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}
                        `}
                    >
                        {loading ? "Sending..." : "Send SOL"}
                    </button>

                    {txSig && (
                        <p className="mt-4 text-sm">
                            View on Explorer:{" "}
                            <a
                                href={`https://explorer.solana.com/tx/${txSig}?cluster=devnet`}
                                className="text-blue-600 underline"
                                target="_blank"
                            >
                                {txSig.slice(0, 6)}...{txSig.slice(-6)}
                            </a>
                        </p>
                    )}
                </>
            )}
        </div>
    );
}
