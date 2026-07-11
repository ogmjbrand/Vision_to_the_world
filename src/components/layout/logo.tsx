import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <span className="relative h-10 w-10 shrink-0">
        <Image
          src="/brand/logo-mark.png"
          alt="Vision To The World"
          fill
          sizes="40px"
          priority
          className="object-contain"
        />
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
