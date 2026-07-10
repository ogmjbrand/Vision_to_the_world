import type { Metadata } from "next";
import { CreditCard, Plus } from "lucide-react";

export const metadata: Metadata = { title: "Payments" };

const gateways = ["Paystack", "Flutterwave", "Stripe", "PayPal"];

export default function PaymentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Payments</h1>
      <p className="mt-1 text-sm text-brand-600">
        Manage your saved payment methods and preferred gateway.
      </p>

      <div className="mt-6 rounded-2xl border border-dashed border-brand-200 bg-white p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CreditCard className="h-6 w-6" />
        </span>
        <p className="mt-3 text-sm text-brand-600">
          You have no saved payment methods yet.
        </p>
        <button className="mx-auto mt-4 flex items-center gap-2 rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-600">
          <Plus className="h-4 w-4" />
          Add payment method
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-brand-900">
          Supported payment gateways
        </h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {gateways.map((g) => (
            <span
              key={g}
              className="rounded-lg border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-brand-800"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
