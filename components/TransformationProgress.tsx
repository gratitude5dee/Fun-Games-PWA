"use client";
import { ProgressBar } from "./ui/progress-bar";
import { Sparkles, Loader2 } from "lucide-react";

interface StreamEvent {
  type: string;
  data?: unknown;
  message?: string;
}

interface TransformationProgressProps {
  progress: number;
  events: StreamEvent[];
}

export default function TransformationProgress({
  progress,
  events,
}: TransformationProgressProps) {
  const latestEvent = events[events.length - 1];

  return (
    <div className="mt-6 space-y-4">
      {/* Progress bar */}
      <ProgressBar progress={progress} />

      {/* Status message */}
      <div className="flex items-center justify-center gap-2 text-sm">
        {progress < 100 ? (
          <>
            <Loader2 className="w-4 h-4 text-[#f4a623] animate-spin" />
            <span className="text-white/60">
              {latestEvent?.message || "Processing your image..."}
            </span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-[#f4a623]" />
            <span className="text-[#f4a623]">Transformation complete!</span>
          </>
        )}
      </div>

      {/* Animated dots */}
      {progress < 100 && (
        <div className="flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#f4a623] animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
