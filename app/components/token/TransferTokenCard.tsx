"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";
import { buildTransferTokenTx } from "@/app/lib/solana/transfertToken";

type Props = {
    mintAddress: string;
    decimals: number;
};

export default function TransferTokenCard({
    mintAddress,
    decimals,
}: Props) {
    const { connection } = useConnection();
    const { publicKey, signTransaction } = useWallet();

    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    const transferToken = async () => {
        if (!publicKey) {
            return toast.error("Connect wallet first");
        }

        try {
            setLoading(true);
            const toastId = toast.loading("Preparing transfer…");

            const mint = new PublicKey(mintAddress);
            const to = new PublicKey(recipient);

            const rawAmount =
                amount * Math.pow(10, decimals);

            const tx = await buildTransferTokenTx({
                connection,
                mint,
                sender: publicKey,
                recipient: to,
                amount: rawAmount,
            });

            tx.feePayer = publicKey;
            tx.recentBlockhash =
                (await connection.getLatestBlockhash()).blockhash;

            const signed = await signTransaction!(tx);
            const sig = await connection.sendRawTransaction(
                signed.serialize()
            );

            await connection.confirmTransaction(sig, "confirmed");

            toast.success("Token transferred", {
                id: toastId,
            });

            setRecipient("");
            setAmount(0);
        } catch (err: any) {
            console.error(err);
            toast.error(
                err.message || "Transfer failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">
                Transfer Token
            </h3>

            <div className="space-y-4">
                <input
                    placeholder="Recipient wallet address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) =>
                        setAmount(Number(e.target.value))
                    }
                    className="w-full border p-2 rounded"
                />

                <button
                    onClick={transferToken}
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-2 rounded flex justify-center"
                >
                    {loading ? (
                        <Spinner size={16} />
                    ) : (
                        "Send Token"
                    )}
                </button>
            </div>
        </div>
    );
}
