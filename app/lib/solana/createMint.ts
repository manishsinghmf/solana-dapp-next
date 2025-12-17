/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Keypair,
    PublicKey,
    SystemProgram,
    Transaction,
} from "@solana/web3.js";
import {
    createInitializeMintInstruction,
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export async function buildCreateMintTx(
    connection: any,
    payer: PublicKey,
    decimals = 9
) {
    const mintKeypair = Keypair.generate();

    const lamports =
        await connection.getMinimumBalanceForRentExemption(
            MINT_SIZE
        );

    const tx = new Transaction();

    // Initialize account instruction
    const createAccountInstruction = SystemProgram.createAccount({
        fromPubkey: payer,
        newAccountPubkey: mintKeypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
    });

    // Initialize mint instruction
    const initializeMintInstruction =
        createInitializeMintInstruction(
            mintKeypair.publicKey,
            decimals,
            payer, // mint authority
            payer  // freeze authority
        );

    // Create mint account
    tx.add(createAccountInstruction, initializeMintInstruction);

    return {
        transaction: tx,
        mintKeypair,
        mintPubkey: mintKeypair.publicKey,
    };
}
