import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105";
  
  const variants = {
    primary: "gradient-primary text-white hover:shadow-colored-primary focus:ring-primary",
    secondary: "gradient-secondary text-white hover:shadow-colored-secondary focus:ring-secondary",
    accent: "gradient-accent text-white hover:shadow-colored-accent focus:ring-accent",
    outline: "border-2 border-primary text-primary hover:gradient-primary hover:text-white hover:border-transparent focus:ring-primary",
    ghost: "text-text hover:bg-primary/10 focus:ring-primary",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
