import {
    PublicKey,
    Transaction,
} from "@solana/web3.js";
import {
    getAssociatedTokenAddress,
    createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";

export async function buildCreateAtaTx(
    mint: PublicKey,
    owner: PublicKey,
    payer: PublicKey
) {
    const ata = await getAssociatedTokenAddress(
        mint,
        owner
    );

    const tx = new Transaction().add(
        createAssociatedTokenAccountInstruction(
            payer,
            ata,
            owner,
            mint
        )
    );

    return {
        transaction: tx,
        ata,
    };
}
