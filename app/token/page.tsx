// import CreateTokenCard from "../components/token/CreateTokenCard";
import MintTokenCard from "../components/token/MintTokenCard";
import TokenListCard from "../components/token/TokenListCard";


export default function TokenPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-3xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-semibold text-slate-900 mb-2">
                    Create Token
                </h1>

                <p className="text-sm text-slate-500 mb-8">
                    Create an SPL token with name, symbol, image, and metadata
                </p>

                <section className="mt-10">
                    <MintTokenCard />
                </section>


                <section className="mt-10">
                    <TokenListCard />
                </section>
            </div>
        </div >
    );
}
