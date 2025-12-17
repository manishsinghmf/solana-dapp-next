import ConnectWallet from "./components/wallet/ConnectWallet";
import BalanceCard from "./components/balance/BalanceCard";
import AirdropCard from "./components/transaction/AirdropCard";
import SendSolCard from "./components/transaction/SendSolCard";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-5xl mx-auto px-6 py-10">

                {/* Header */}
                <header className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-900">
                            Solana Dashboard
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Manage balance, send SOL, and request airdrops
                        </p>
                    </div>
                    {/* <ConnectWallet /> */}
                </header>

                {/* Top Cards */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <div className="md:col-span-2">
                        <BalanceCard />
                    </div>
                    <AirdropCard />
                </section>

                {/* Primary Action */}
                <section>
                    <SendSolCard />
                </section>

            </div>
        </div>
    );
}
