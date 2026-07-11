"use client";

import dynamic from "next/dynamic";

const OfficeMap = dynamic(() => import("@/components/contact/office-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-brand-50 text-sm text-brand-400">
      Loading map...
    </div>
  ),
});

export default function OfficeMapLoader() {
  return <OfficeMap />;
}
