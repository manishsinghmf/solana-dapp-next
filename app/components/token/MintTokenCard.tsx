"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";

import { buildCreateMintTx } from "@/app/lib/solana/createMint";
import { buildCreateAtaTx } from "@/app/lib/solana/getOrCreateAta";
import { buildMintToTx } from "@/app/lib/solana/mintTo";

export default function MintTokenCard() {
    const { connection } = useConnection();
    const { publicKey, signTransaction } = useWallet();

    const [loading, setLoading] = useState(false);
    const [mint, setMint] = useState<string | null>(null);

    const handleCreateAndMint = async () => {
        if (!publicKey) {
            return toast.error("Connect wallet first");
        }

        try {
            setLoading(true);
            const toastId = toast.loading("Creating token...");

            // 1. Create mint
            const {
                transaction: mintTx,
                mintKeypair,
                mintPubkey,
            } = await buildCreateMintTx(
                connection,
                publicKey
            );

            // 2. Create ATA
            const {
                transaction: ataTx,
                ata,
            } = await buildCreateAtaTx(
                mintPubkey,
                publicKey,
                publicKey
            );

            // 3. Mint tokens (1 token with 9 decimals)
            const mintToTx = buildMintToTx(
                mintPubkey,
                ata,
                publicKey,
                1_000_000_000
            );

            // 4. Combine transactions
            const tx = mintTx
                .add(...ataTx.instructions)
                .add(...mintToTx.instructions);

            tx.feePayer = publicKey;
            tx.recentBlockhash =
                (await connection.getLatestBlockhash()).blockhash;

            // Mint account must partially sign
            tx.partialSign(mintKeypair);

            const signed = await signTransaction!(tx);
            const sig = await connection.sendRawTransaction(
                signed.serialize()
            );

            await connection.confirmTransaction(sig, "confirmed");

            setMint(mintPubkey.toBase58());
            toast.success("Token created & minted", { id: toastId });

        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Mint failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border p-6">
            <h3 className="text-lg font-semibold mb-4">
                Create & Mint SPL Token
            </h3>

            <button
                onClick={handleCreateAndMint}
                disabled={loading || !publicKey}
                className="
                    w-full
                    bg-purple-600
                    hover:bg-purple-700
                    disabled:bg-slate-300
                    text-white
                    py-2.5
                    rounded-lg
                    flex items-center justify-center gap-2
                "
            >
                {loading ? (
                    <>
                        <Spinner size={16} />
                        <span>Processing…</span>
                    </>
                ) : (
                    "Create Token"
                )}
            </button>

            {mint && (
                <p className="text-sm text-slate-500 mt-4">
                    Mint Address:{" "}
                    <a
                        href={`https://explorer.solana.com/address/${mint}?cluster=devnet`}
                        target="_blank"
                        className="text-purple-600 hover:underline"
                    >
                        {mint.slice(0, 6)}…{mint.slice(-6)}
                    </a>
                </p>
            )}
        </div>
    );
}
