import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "default" | "large" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  default: "bg-[#c6f36b] text-[#11140d] hover:bg-[#d4f78b]",
  outline: "border border-white/10 bg-transparent text-white/80 hover:bg-white/[.06]",
  ghost: "bg-transparent text-white/65 hover:bg-white/[.06] hover:text-white"
};

const sizes: Record<ButtonSize, string> = {
  default: "min-h-10 px-4 py-2",
  large: "min-h-12 px-5 py-3",
  icon: "h-10 w-10 p-2"
};

export function Button({ variant = "default", size = "default", className = "", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={`focus-ring inline-flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}
