/* eslint-disable @typescript-eslint/no-explicit-any */
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export type WalletTokenInfo = {
    tokenAccount: string;
    mint: string;
    amount: number;
    decimals: number;
};

export async function getWalletTokens(
    connection: any,
    owner: PublicKey
): Promise<WalletTokenInfo[]> {
    const response =
        await connection.getParsedTokenAccountsByOwner(
            owner,
            { programId: TOKEN_PROGRAM_ID }
        );

    return response.value
        .map(({ pubkey, account }: { pubkey: PublicKey; account: any }) => {
            const parsed = account.data.parsed;

            if (parsed?.type !== "account") return null;

            const info = parsed.info;
            const amount = info.tokenAmount.uiAmount;

            if (!amount || amount === 0) return null;

            return {
                tokenAccount: pubkey.toBase58(),
                mint: info.mint,
                amount,
                decimals: info.tokenAmount.decimals,
            };
        })
        .filter(
            (token: WalletTokenInfo | null): token is WalletTokenInfo =>
                token !== null
        );
}
