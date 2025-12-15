import { useState, useCallback, useRef, useEffect } from "react";

interface UseCameraReturn {
  stream: MediaStream | null;
  error: string | null;
  isLoading: boolean;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  switchCamera: () => Promise<void>;
  facingMode: "user" | "environment";
}

export function useCamera(): UseCameraReturn {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setStream(null);
    }
  }, []);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // Stop any existing stream
    stopCamera();

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = mediaStream;
      setStream(mediaStream);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Camera access denied. Please enable camera permissions.";
      setError(errorMessage);
      console.error("Camera error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [facingMode, stopCamera]);

  const switchCamera = useCallback(async () => {
    const newFacingMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newFacingMode);

    if (stream) {
      stopCamera();
      setIsLoading(true);

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: newFacingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
        streamRef.current = mediaStream;
        setStream(mediaStream);
      } catch (err) {
        setError("Failed to switch camera");
      } finally {
        setIsLoading(false);
      }
    }
  }, [facingMode, stream, stopCamera]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    stream,
    error,
    isLoading,
    startCamera,
    stopCamera,
    switchCamera,
    facingMode,
  };
}
