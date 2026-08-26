import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-valli-clay disabled:opacity-50 disabled:pointer-events-none select-none tracking-tight";

    const variantStyles = {
      // Primary: Fondo Valli Ink (#171714), Texto Valli Bone (#F4F0E7)
      primary:
        "bg-valli-ink text-valli-bone hover:bg-black active:bg-stone-900 shadow-sm",
      // Secondary: Background transparente, Border Valli Ink, Texto Valli Ink
      secondary:
        "bg-transparent border border-valli-ink text-valli-ink hover:bg-valli-ink/5 active:bg-valli-ink/10",
      outline:
        "bg-transparent border border-valli-sand/70 text-valli-ink hover:border-valli-ink hover:bg-valli-bone/50",
      ghost:
        "bg-transparent text-valli-ink hover:bg-valli-sand/20 active:bg-valli-sand/30",
      dark:
        "bg-valli-bone text-valli-ink hover:bg-valli-white active:bg-valli-bone/90",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs rounded-sm",
      md: "h-10 px-5 text-sm rounded",
      lg: "h-12 px-7 text-base rounded-md",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
