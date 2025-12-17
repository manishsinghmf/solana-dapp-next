import {
    PublicKey,
    Transaction,
} from "@solana/web3.js";
import {
    createMintToInstruction,
} from "@solana/spl-token";

export function buildMintToTx(
    mint: PublicKey,
    ata: PublicKey,
    authority: PublicKey,
    amount: number
) {
    const tx = new Transaction().add(
        createMintToInstruction(
            mint,
            ata,
            authority,
            amount
        )
    );

    return tx;
}
