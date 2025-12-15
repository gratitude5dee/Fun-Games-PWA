"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelect: (imageDataUrl: string) => void;
  className?: string;
}

export default function ImageUploader({
  onImageSelect,
  className,
}: ImageUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
          alert("File size must be less than 10MB");
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          onImageSelect(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
    noClick: false,
    noKeyboard: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "aspect-square rounded-2xl border-2 border-dashed cursor-pointer",
        "transition-all duration-300 flex flex-col items-center justify-center gap-4 p-6",
        isDragActive
          ? "border-[#f4a623] bg-[#f4a623]/10 scale-[1.02]"
          : "border-white/20 hover:border-white/40 hover:bg-white/5",
        className
      )}
    >
      <input {...getInputProps()} />

      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
          isDragActive
            ? "bg-[#f4a623]/20 text-[#f4a623]"
            : "bg-white/5 text-white/60"
        )}
      >
        {isDragActive ? (
          <ImageIcon className="w-8 h-8" />
        ) : (
          <Upload className="w-8 h-8" />
        )}
      </div>

      <div className="text-center">
        <p
          className={cn(
            "font-medium transition-colors duration-300",
            isDragActive ? "text-[#f4a623]" : "text-white"
          )}
        >
          {isDragActive ? "Drop your image here" : "Drop your image here"}
        </p>
        <p className="text-white/40 text-sm mt-1">or click to browse</p>
      </div>

      <p className="text-white/30 text-xs">PNG, JPG, WEBP up to 10MB</p>
    </div>
  );
}
