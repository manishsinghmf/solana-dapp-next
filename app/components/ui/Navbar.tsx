"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ConnectWallet from "../wallet/ConnectWallet";

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) =>
        pathname === path;

    return (
        <header className="sticky top-0 z-50 bg-white border-b">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Left: Brand + Nav */}
                <div className="flex items-center gap-10">
                    {/* Brand */}
                    <Link
                        href="/"
                        className="text-lg font-semibold text-slate-900"
                    >
                        Solana dApp
                    </Link>

                    {/* Nav Links */}
                    <nav className="flex items-center gap-6">
                        <Link
                            href="/"
                            className={`
                                text-sm font-medium transition
                                ${isActive("/")
                                    ? "text-purple-600"
                                    : "text-slate-600 hover:text-slate-900"
                                }
                            `}
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/token"
                            className={`
                                text-sm font-medium transition
                                ${isActive("/token")
                                    ? "text-purple-600"
                                    : "text-slate-600 hover:text-slate-900"
                                }
                            `}
                        >
                            Tokens
                        </Link>
                    </nav>
                </div>

                {/* Right: Wallet */}
                <ConnectWallet />
            </div>
        </header>
    );
}
