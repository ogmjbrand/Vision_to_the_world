import { Compass } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-600 text-white shadow-sm">
        <Compass className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-lg font-bold tracking-tight",
            dark ? "text-white" : "text-brand-950",
          )}
        >
          Vision To The World
        </span>
        <span
          className={cn(
            "text-[11px] font-medium tracking-wide",
            dark ? "text-brand-200" : "text-brand-600",
          )}
        >
          Your Journey. Your Choice. Your World.
        </span>
      </span>
    </Link>
  );
}
