import { Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function CashAppPayment({
  cashtag,
  total,
}: {
  cashtag?: string;
  total: number;
}) {
  if (!cashtag) return null;

  return (
    <div className="rounded-lg border border-brand-200 bg-white px-4 py-3">
      <p className="flex items-center gap-2 text-sm font-semibold text-brand-950">
        <Wallet className="h-4 w-4 text-accent-600" />
        Pay with Cash App
      </p>
      <p className="mt-1 text-sm text-brand-600">
        Send {formatCurrency(total)} to{" "}
        <span className="font-semibold text-brand-900">{cashtag}</span> and
        include your name and booking details in the note. Our team confirms
        Cash App payments manually within one business day.
      </p>
    </div>
  );
}
