"use client";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { Flame } from "lucide-react";

export default function Header() {
  const account = useActiveAccount();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-black/40 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f4a623] to-[#ff6b35] flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
              <Flame className="w-6 h-6 text-black" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white">
              BUSS DOWN
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-white/60 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            {account && (
              <Link
                href="/transform"
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                Transform
              </Link>
            )}
          </nav>

          {/* Connect Button */}
          <div className="flex items-center gap-4">
            <ConnectWalletButton variant="compact" />
          </div>
        </div>
      </div>
    </header>
  );
}
