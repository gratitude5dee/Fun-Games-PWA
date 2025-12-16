import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
  hover?: boolean;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ children, className, glow = false, hover = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl",
          "bg-white/[0.03] backdrop-blur-xl",
          "border border-white/[0.08]",
          "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
          glow && "shadow-[0_0_40px_rgba(244,166,35,0.1)]",
          "transition-all duration-300",
          hover && "hover:border-white/[0.12] hover:bg-white/[0.05]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";
