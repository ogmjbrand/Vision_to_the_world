import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/layout/logo";

export default function AppTopbar({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={
        dark
          ? "flex items-center justify-between border-b border-brand-900 bg-brand-950 px-4 py-3 sm:px-6"
          : "flex items-center justify-between border-b border-brand-100 bg-white px-4 py-3 sm:px-6"
      }
    >
      <Logo dark={dark} />
      <Link
        href="/"
        className={
          dark
            ? "flex items-center gap-1.5 text-sm font-medium text-brand-200 hover:text-white"
            : "flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-950"
        }
      >
        <ArrowLeft className="h-4 w-4" />
        Back to site
      </Link>
    </div>
  );
}
