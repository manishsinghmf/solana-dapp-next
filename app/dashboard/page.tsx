import ConnectWallet from "../components/wallet/ConnectWallet";
import BalanceCard from "../components/balance/BalanceCard";
import AirdropCard from "../components/transaction/AirdropCard";
import SendSolCard from "../components/transaction/SendSolCard";

export default function DashboardPage() {
    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Solana Dashboard
            </h1>

            <ConnectWallet />
            <BalanceCard />
            <SendSolCard />
            <AirdropCard />
        </div>
    );
}
