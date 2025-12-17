/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    getAssociatedTokenAddress,
    createAssociatedTokenAccountInstruction,
    createTransferInstruction,
} from "@solana/spl-token";
import {
    PublicKey,
    Transaction,
} from "@solana/web3.js";

export async function buildTransferTokenTx({
    connection,
    mint,
    sender,
    recipient,
    amount,
}: {
    connection: any;
    mint: PublicKey;
    sender: PublicKey;
    recipient: PublicKey;
    amount: number; // already in smallest unit
}) {
    const senderAta = await getAssociatedTokenAddress(
        mint,
        sender
    );

    const recipientAta = await getAssociatedTokenAddress(
        mint,
        recipient
    );

    const tx = new Transaction();

    // Create recipient ATA if missing
    const recipientAccount =
        await connection.getAccountInfo(recipientAta);

    if (!recipientAccount) {
        tx.add(
            createAssociatedTokenAccountInstruction(
                sender,        // payer
                recipientAta,  // ata
                recipient,     // owner
                mint
            )
        );
    }

    // Transfer tokens
    tx.add(
        createTransferInstruction(
            senderAta,
            recipientAta,
            sender,
            amount
        )
    );

    return tx;
}
