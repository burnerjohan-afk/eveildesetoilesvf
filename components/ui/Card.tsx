import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary" | "accent";
  hover?: boolean;
}

export function Card({ 
  children, 
  className, 
  padding = "md",
  variant = "default",
  hover = false
}: CardProps) {
  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };
  
  const variants = {
    default: "bg-white border-border",
    primary: "bg-primary/5 border-primary/20",
    secondary: "bg-secondary/5 border-secondary/20",
    accent: "bg-accent/5 border-accent/20",
  };
  
  return (
    <div
      className={cn(
        "rounded-lg border shadow-sm transition-all duration-300",
        paddings[padding],
        variants[variant],
        hover && "hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
