import Link from "next/link";
import { cn } from "@/lib/utils";

type CommonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

const variants: Record<NonNullable<CommonProps["variant"]>, string> = {
  // accent-700 (not -500) so white button text clears WCAG AA's 4.5:1
  // contrast minimum — accent-500 measures 3.10:1, accent-600 4.01:1, both
  // fail; accent-700 measures 5.29:1. Same olive/chartreuse hue family,
  // just the next shade down.
  primary: "bg-accent-700 text-white hover:bg-accent-800 shadow-sm",
  secondary: "bg-brand-900 text-white hover:bg-brand-800 shadow-sm",
  outline: "border border-brand-200 text-brand-900 hover:bg-brand-50",
  ghost: "text-brand-900 hover:bg-brand-50",
};

const sizes: Record<NonNullable<CommonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  >) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
