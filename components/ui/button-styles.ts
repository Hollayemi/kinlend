import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "sec" | "ter" | "onDark" | "onDarkOutline";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-[background-color,color,border-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ter-500 disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-pri-600 text-white hover:bg-pri-700 active:bg-pri-800",
  secondary: "border border-neu-300 bg-white text-neu-900 hover:border-neu-900",
  outline: "border border-pri-600 text-pri-700 hover:bg-pri-50",
  ghost: "text-neu-800 hover:bg-neu-100",
  sec: "bg-sec-600 text-white hover:bg-sec-700 active:bg-sec-800",
  ter: "bg-ter-600 text-white hover:bg-ter-700 active:bg-ter-800",
  onDark: "bg-white text-neu-900 hover:bg-neu-100",
  onDarkOutline: "border border-white/40 text-white hover:border-white hover:bg-white/10",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-[3.25rem] px-6 text-base",
};

export const buttonClasses = ({ variant = "primary", size = "md", className }: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) =>
  cn(base, variants[variant], sizes[size], className);
