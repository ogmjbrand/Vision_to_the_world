"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqCategory } from "@/lib/data/faq";

export default function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      {categories.map((category) => (
        <div key={category.category}>
          <h2 className="text-lg font-bold text-brand-950">{category.category}</h2>
          <div className="mt-4 divide-y divide-brand-100 rounded-2xl border border-brand-100 bg-white shadow-sm">
            {category.items.map((item) => {
              const key = `${category.category}-${item.question}`;
              const open = openKey === key;
              return (
                <div key={key}>
                  <button
                    type="button"
                    onClick={() => setOpenKey(open ? null : key)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-sm font-semibold text-brand-900">{item.question}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-brand-400 transition-transform",
                        open && "rotate-180 text-accent-600",
                      )}
                    />
                  </button>
                  {open && (
                    <p className="px-5 pb-4 text-sm leading-relaxed text-brand-600">{item.answer}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
