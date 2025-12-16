import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "relative font-semibold rounded-xl transition-all duration-300",
          "flex items-center justify-center gap-2",
          // Size variants
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-base",
          size === "lg" && "px-8 py-4 text-lg",
          // Variant styles
          variant === "primary" && [
            "bg-gradient-to-r from-[#f4a623] to-[#ff6b35]",
            "text-black font-bold",
            "hover:shadow-[0_0_30px_rgba(244,166,35,0.5)]",
            "active:scale-[0.98]",
          ],
          variant === "secondary" && [
            "bg-white/5 border border-white/10",
            "text-white",
            "hover:bg-white/10 hover:border-[#f4a623]/30",
          ],
          variant === "ghost" && [
            "bg-transparent",
            "text-white/80",
            "hover:text-white hover:bg-white/5",
          ],
          // Disabled state
          disabled && "opacity-50 cursor-not-allowed hover:shadow-none active:scale-100",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";
