"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { CheckoutItem } from "@/lib/checkout";
import { computeOrderTotals } from "@/lib/checkout";
import { createClient } from "@/lib/supabase/client";
import { recordPaidBooking } from "@/lib/supabase/bookings";

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: Record<string, unknown>) => {
        render: (selector: string) => void;
      };
    };
  }
}

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export default function PayPalButton({
  item,
  userId,
  userEmail,
}: {
  item: CheckoutItem;
  userId?: string;
  userEmail?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!PAYPAL_CLIENT_ID || !containerRef.current) return;

    const scriptId = "paypal-sdk";
    const { total } = computeOrderTotals(item.price);

    function renderButtons() {
      window.paypal?.Buttons({
        style: { layout: "vertical", color: "gold", label: "paypal" },
        createOrder: (_data: unknown, actions: {
          order: { create: (opts: unknown) => Promise<string> };
        }) =>
          actions.order.create({
            purchase_units: [
              {
                description: item.title,
                amount: { value: total.toFixed(2), currency_code: item.currency },
              },
            ],
          }),
        onApprove: async (_data: unknown, actions: {
          order: { capture: () => Promise<{ id?: string }> };
        }) => {
          const details = await actions.order.capture();

          let bookingRef: string | undefined;
          let invoiceNumber: string | undefined;

          if (userId) {
            const supabase = createClient();
            const { booking, invoice } = await recordPaidBooking(supabase, {
              userId,
              item,
              gateway: "paypal",
              gatewayReference: details?.id,
            });
            if (booking) bookingRef = `VTW-${booking.id.slice(0, 8).toUpperCase()}`;
            if (invoice) invoiceNumber = invoice.invoice_number;
          }

          if (userEmail) {
            const { subtotal, serviceFee } = computeOrderTotals(item.price);

            fetch("/api/notifications/booking-confirmation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                to: userEmail,
                title: item.title,
                type: item.type,
                total,
                currency: item.currency,
                bookingRef,
              }),
            }).catch(() => {
              // Booking already recorded — a failed confirmation email shouldn't block checkout.
            });

            fetch("/api/notifications/invoice", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                to: userEmail,
                title: item.title,
                invoiceNumber,
                subtotal,
                serviceFee,
                total,
                currency: item.currency,
              }),
            }).catch(() => {
              // Booking already recorded — a failed invoice email shouldn't block checkout.
            });
          }

          router.push("/checkout/success?method=paypal");
        },
      }).render("#paypal-button-container");
    }

    if (window.paypal) {
      renderButtons();
      return;
    }

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${item.currency}`;
      script.onload = renderButtons;
      document.body.appendChild(script);
    } else {
      script.addEventListener("load", renderButtons);
    }
  }, [item, router, userId, userEmail]);

  if (!PAYPAL_CLIENT_ID) {
    return (
      <div className="rounded-lg border border-dashed border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-600">
        PayPal isn&apos;t configured on this deployment yet.
      </div>
    );
  }

  return <div id="paypal-button-container" ref={containerRef} />;
}
