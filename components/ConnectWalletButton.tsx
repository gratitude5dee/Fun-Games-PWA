"use client";
import { ConnectButton } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { client } from "../lib/thirdweb-client";

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "discord", "telegram", "email", "phone", "passkey"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

interface ConnectWalletButtonProps {
  variant?: "default" | "compact";
}

export function ConnectWalletButton({ variant = "default" }: ConnectWalletButtonProps) {
  // Don't render if client is not configured
  if (!client) {
    return (
      <button
        className="bg-gradient-to-r from-[#f4a623] to-[#ff6b35] text-black font-semibold rounded-xl px-6 py-3 opacity-50 cursor-not-allowed"
        disabled
      >
        Wallet Not Configured
      </button>
    );
  }

  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      theme="dark"
      connectButton={{
        label: variant === "compact" ? "Connect" : "Connect to Buss Down",
        className:
          "!bg-gradient-to-r !from-[#f4a623] !to-[#ff6b35] !text-black !font-semibold !rounded-xl !px-6 !py-3 hover:!shadow-[0_0_30px_rgba(244,166,35,0.4)] !transition-all !duration-300 !border-0",
      }}
      connectModal={{
        size: "compact",
        title: "BUSS DOWN",
        showThirdwebBranding: false,
      }}
    />
  );
}
