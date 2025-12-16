"use client";
import { useState } from "react";
import Image from "next/image";
import { Download, Share2, RefreshCw, Check, Copy } from "lucide-react";
import { GlowButton } from "./ui/glow-button";
import { cn } from "@/lib/utils";

interface ResultDisplayProps {
  originalImage: string;
  transformedImage: string;
  onReset: () => void;
}

export default function ResultDisplay({
  originalImage,
  transformedImage,
  onReset,
}: ResultDisplayProps) {
  const [showComparison, setShowComparison] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleDownload = async () => {
    try {
      const response = await fetch(transformedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bussed-down-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out my bussed down pic!",
          text: "I just transformed my photo with BUSS DOWN AI",
          url: transformedImage,
        });
      } catch (error) {
        // User cancelled or share failed
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(transformedImage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, percentage)));
  };

  return (
    <div className="space-y-4">
      {/* Image display */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5">
        {showComparison ? (
          // Before/After comparison slider
          <div
            className="relative w-full h-full cursor-ew-resize"
            onMouseMove={(e) => e.buttons === 1 && handleSliderMove(e)}
            onTouchMove={handleSliderMove}
            onMouseDown={handleSliderMove}
          >
            {/* After (transformed) - full width */}
            <Image
              src={transformedImage}
              alt="Transformed"
              fill
              className="object-cover"
              unoptimized
            />

            {/* Before (original) - clipped */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <Image
                src={originalImage}
                alt="Original"
                fill
                className="object-cover"
                style={{ width: `${100 / (sliderPosition / 100)}%` }}
                unoptimized
              />
            </div>

            {/* Slider line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-3 bg-black rounded-full" />
                  <div className="w-0.5 h-3 bg-black rounded-full" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white">
              Before
            </div>
            <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white">
              After
            </div>
          </div>
        ) : (
          // Single transformed image
          <Image
            src={transformedImage}
            alt="Transformed image"
            fill
            className="object-cover golden-glow"
            unoptimized
          />
        )}
      </div>

      {/* Toggle comparison */}
      <button
        onClick={() => setShowComparison(!showComparison)}
        className="w-full py-2 text-sm text-white/60 hover:text-white transition-colors"
      >
        {showComparison ? "Hide comparison" : "Compare before/after"}
      </button>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <GlowButton onClick={handleDownload} variant="primary" size="md">
          <Download className="w-4 h-4" />
          Download
        </GlowButton>

        <GlowButton onClick={handleShare} variant="secondary" size="md">
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              Share
            </>
          )}
        </GlowButton>
      </div>

      {/* Reset button */}
      <button
        onClick={onReset}
        className="w-full py-3 text-white/60 hover:text-white transition-colors flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Transform another image
      </button>
    </div>
  );
}
