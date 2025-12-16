"use client";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";
import { ConnectWalletButton } from "../components/ConnectWalletButton";
import { GlowButton } from "../components/ui/glow-button";
import { GlassPanel } from "../components/ui/glass-panel";
import {
  Flame,
  Sparkles,
  Zap,
  Camera,
  Download,
  Share2,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const account = useActiveAccount();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a0f00] to-black" />

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#f4a623]/10 rounded-full blur-[128px] animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff6b35]/10 rounded-full blur-[128px] animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f4a623]/5 rounded-full blur-[200px]"
          />
        </div>

        {/* Noise texture */}
        <div className="absolute inset-0 noise-overlay opacity-50" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fade-up">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#f4a623] to-[#ff6b35] flex items-center justify-center shadow-glow-lg animate-glow">
              <Flame className="w-12 h-12 text-black" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight mb-6 animate-fade-up">
            <span className="text-gradient-gold">BUSS DOWN</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 mb-4 animate-fade-up animation-delay-100">
            Transform any photo into pure drip with AI
          </p>

          <p className="text-white/40 mb-12 max-w-lg mx-auto animate-fade-up animation-delay-200">
            Upload a selfie or take a photo and watch as our AI transforms it
            into something extraordinary
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-300">
            {account ? (
              <Link href="/transform">
                <GlowButton size="lg" className="min-w-[200px]">
                  Start Transforming
                  <ArrowRight className="w-5 h-5" />
                </GlowButton>
              </Link>
            ) : (
              <ConnectWalletButton />
            )}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
              <div className="w-1 h-2 bg-white/40 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">
              How It Works
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Three simple steps to transform your photos into something special
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <GlassPanel className="p-8 text-center group" glow>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f4a623]/20 to-[#ff6b35]/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-8 h-8 text-[#f4a623]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                1. Upload or Capture
              </h3>
              <p className="text-white/60">
                Drop your image or take a selfie directly from your camera
              </p>
            </GlassPanel>

            {/* Step 2 */}
            <GlassPanel className="p-8 text-center group" glow>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f4a623]/20 to-[#ff6b35]/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-[#f4a623]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                2. AI Transformation
              </h3>
              <p className="text-white/60">
                Our AI works its magic to buss down your photo with style
              </p>
            </GlassPanel>

            {/* Step 3 */}
            <GlassPanel className="p-8 text-center group" glow>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f4a623]/20 to-[#ff6b35]/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Download className="w-8 h-8 text-[#f4a623]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                3. Download & Share
              </h3>
              <p className="text-white/60">
                Save your transformed image and share it with the world
              </p>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-[#0f0a00] to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <GlassPanel className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f4a623]/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-[#f4a623]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Lightning Fast
                  </h3>
                  <p className="text-white/60">
                    State-of-the-art AI generates your transformed image in
                    seconds, not minutes
                  </p>
                </div>
              </div>
            </GlassPanel>

            {/* Feature 2 */}
            <GlassPanel className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f4a623]/10 flex items-center justify-center flex-shrink-0">
                  <Camera className="w-6 h-6 text-[#f4a623]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Camera Ready
                  </h3>
                  <p className="text-white/60">
                    Take selfies directly from the app with our built-in camera
                    capture
                  </p>
                </div>
              </div>
            </GlassPanel>

            {/* Feature 3 */}
            <GlassPanel className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f4a623]/10 flex items-center justify-center flex-shrink-0">
                  <Share2 className="w-6 h-6 text-[#f4a623]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Easy Sharing
                  </h3>
                  <p className="text-white/60">
                    Download or share your transformed images instantly with one
                    click
                  </p>
                </div>
              </div>
            </GlassPanel>

            {/* Feature 4 */}
            <GlassPanel className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f4a623]/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-[#f4a623]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Premium Quality
                  </h3>
                  <p className="text-white/60">
                    High-resolution output that looks stunning on any device or
                    print
                  </p>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <GlassPanel className="p-12" glow>
            <Flame className="w-16 h-16 text-[#f4a623] mx-auto mb-6 animate-float" />
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">
              Ready to Buss Down?
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Connect your wallet and start transforming your photos today. Its
              free to try!
            </p>
            {account ? (
              <Link href="/transform">
                <GlowButton size="lg">
                  Start Transforming
                  <ArrowRight className="w-5 h-5" />
                </GlowButton>
              </Link>
            ) : (
              <ConnectWalletButton />
            )}
          </GlassPanel>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#f4a623]" />
            <span className="font-display font-bold text-white">BUSS DOWN</span>
          </div>
          <p className="text-white/40 text-sm">
            Powered by AI. Built with love.
          </p>
        </div>
      </footer>
    </div>
  );
}
