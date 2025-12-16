import { useState, useCallback } from "react";

interface StreamEvent {
  type: string;
  data?: unknown;
  message?: string;
}

interface UseImageTransformReturn {
  transformedImage: string | null;
  isTransforming: boolean;
  progress: number;
  streamEvents: StreamEvent[];
  error: string | null;
  transform: (imageDataUrl: string) => Promise<void>;
  reset: () => void;
}

export function useImageTransform(): UseImageTransformReturn {
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [progress, setProgress] = useState(0);
  const [streamEvents, setStreamEvents] = useState<StreamEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  const transform = useCallback(async (imageDataUrl: string) => {
    setIsTransforming(true);
    setProgress(0);
    setError(null);
    setStreamEvents([]);
    setTransformedImage(null);

    // Simulate progress while waiting
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 500);

    try {
      setStreamEvents((prev) => [
        ...prev,
        { type: "status", message: "Uploading image..." },
      ]);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageDataUrl }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Transformation failed");
      }

      setStreamEvents((prev) => [
        ...prev,
        { type: "status", message: "Transformation complete!" },
      ]);

      setTransformedImage(data.imageUrl);
      setProgress(100);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      setStreamEvents((prev) => [
        ...prev,
        { type: "error", message: errorMessage },
      ]);
    } finally {
      clearInterval(progressInterval);
      setIsTransforming(false);
    }
  }, []);

  const reset = useCallback(() => {
    setTransformedImage(null);
    setProgress(0);
    setError(null);
    setStreamEvents([]);
  }, []);

  return {
    transformedImage,
    isTransforming,
    progress,
    streamEvents,
    error,
    transform,
    reset,
  };
}
