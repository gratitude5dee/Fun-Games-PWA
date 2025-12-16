"use client";
import { useRef, useEffect, useState } from "react";
import { useCamera } from "../hooks/useCamera";
import { X, Camera, SwitchCamera, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CameraCaptureProps {
  onCapture: (imageDataUrl: string) => void;
  onClose: () => void;
}

export default function CameraCapture({
  onCapture,
  onClose,
}: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { stream, error, isLoading, startCamera, stopCamera, switchCamera, facingMode } =
    useCamera();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const capturePhoto = () => {
    // Start countdown
    setCountdown(3);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          // Flash effect
          setFlash(true);
          setTimeout(() => setFlash(false), 200);

          // Actually capture
          if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");

            // Mirror the image for front camera
            if (facingMode === "user") {
              ctx?.translate(canvas.width, 0);
              ctx?.scale(-1, 1);
            }

            ctx?.drawImage(video, 0, 0);
            const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);
            onCapture(imageDataUrl);
          }
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  if (error) {
    return (
      <div className="aspect-square rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center p-6">
        <div className="text-center">
          <Camera className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="aspect-square rounded-2xl bg-white/5 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#f4a623] animate-spin mx-auto mb-3" />
          <p className="text-white/60">Starting camera...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={cn(
          "w-full h-full object-cover",
          facingMode === "user" && "mirror"
        )}
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Flash effect */}
      {flash && (
        <div className="absolute inset-0 bg-white animate-fade-in pointer-events-none" />
      )}

      {/* Countdown overlay */}
      {countdown && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <span className="text-8xl font-bold text-[#f4a623] animate-pulse">
            {countdown}
          </span>
        </div>
      )}

      {/* Corner frame guides */}
      <div className="absolute inset-4 pointer-events-none">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#f4a623]/50 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#f4a623]/50 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#f4a623]/50 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#f4a623]/50 rounded-br-lg" />
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-6">
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
          aria-label="Close camera"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={capturePhoto}
          disabled={countdown !== null}
          className={cn(
            "p-4 rounded-full transition-all",
            "bg-gradient-to-br from-[#f4a623] to-[#ff6b35]",
            "hover:shadow-[0_0_30px_rgba(244,166,35,0.5)]",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          aria-label="Take photo"
        >
          <Camera className="w-8 h-8 text-black" />
        </button>

        <button
          onClick={switchCamera}
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
          aria-label="Switch camera"
        >
          <SwitchCamera className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
