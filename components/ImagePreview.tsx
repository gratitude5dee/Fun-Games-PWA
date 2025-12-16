"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImagePreview({ src, alt, className }: ImagePreviewProps) {
  return (
    <div
      className={cn(
        "relative aspect-square rounded-xl overflow-hidden bg-white/5",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        unoptimized
      />
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
}
