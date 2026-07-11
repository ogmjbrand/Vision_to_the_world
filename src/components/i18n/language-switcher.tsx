"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { languages } from "@/lib/i18n/languages";
import { useLanguage } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = languages.find((l) => l.code === lang) ?? languages[0];

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label="Change language"
        className={cn(
          "flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium",
          variant === "light"
            ? "text-brand-900 hover:bg-brand-50"
            : "text-brand-200 hover:bg-white/10 hover:text-white",
        )}
      >
        <Globe className="h-4 w-4" />
        {current.code.toUpperCase()}
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full z-50 min-w-[160px] rounded-xl border p-1.5 shadow-xl",
            variant === "light"
              ? "border-brand-100 bg-white"
              : "border-brand-800 bg-brand-950",
          )}
        >
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm",
                l.code === lang
                  ? variant === "light"
                    ? "bg-brand-50 font-semibold text-brand-950"
                    : "bg-white/10 font-semibold text-white"
                  : variant === "light"
                    ? "text-brand-700 hover:bg-brand-50"
                    : "text-brand-200 hover:bg-white/5",
              )}
            >
              {l.nativeLabel}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
