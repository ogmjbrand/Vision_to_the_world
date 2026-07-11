"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { CheckoutItem } from "@/lib/checkout";
import { createClient } from "@/lib/supabase/client";
import { recordPaidBooking } from "@/lib/supabase/bookings";
import { Button } from "@/components/ui/button";

export default function CashAppPayment({
  cashtag,
  total,
  item,
  userId,
}: {
  cashtag?: string;
  total: number;
  item: CheckoutItem;
  userId?: string;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!cashtag) return null;

  async function handleConfirm() {
    setLoading(true);

    if (userId) {
      const supabase = createClient();
      await recordPaidBooking(supabase, {
        userId,
        item,
        gateway: "cashapp",
        paymentStatus: "pending",
        bookingStatus: "pending_confirmation",
      });
    }

    setLoading(false);
    setConfirmed(true);
    router.push("/checkout/success?method=cashapp");
  }

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
      <Button
        onClick={handleConfirm}
        disabled={loading || confirmed}
        variant="outline"
        size="sm"
        className="mt-3"
      >
        <CheckCircle2 className="h-4 w-4" />
        {confirmed ? "Recorded" : loading ? "Recording..." : "I've sent the payment"}
      </Button>
    </div>
  );
}
