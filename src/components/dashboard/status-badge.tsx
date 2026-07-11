import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  Upcoming: "bg-brand-100 text-brand-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Pending: "bg-accent-100 text-accent-700",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        styles[status] ?? "bg-brand-100 text-brand-700",
      )}
    >
      {status}
    </span>
  );
}
