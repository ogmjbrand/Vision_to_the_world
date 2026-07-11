"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CheckoutItem } from "@/lib/checkout";

export default function StripeButton({
  item,
  configured,
}: {
  item: CheckoutItem;
  configured: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Unable to start Stripe checkout.");
      }

      window.location.href = data.url;
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (!configured) {
    return (
      <div className="rounded-lg border border-dashed border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-600">
        Card payments via Stripe aren&apos;t configured on this deployment yet.
      </div>
    );
  }

  return (
    <div>
      <Button onClick={handleClick} disabled={loading} className="w-full">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
        {loading ? "Redirecting to Stripe..." : "Pay with card (Stripe)"}
      </Button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
