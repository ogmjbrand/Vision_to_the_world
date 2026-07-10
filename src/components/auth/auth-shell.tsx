import Logo from "@/components/layout/logo";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 p-12 text-white lg:flex">
        <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
        <div
          className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          <Logo dark />
        </div>
        <blockquote className="relative max-w-md">
          <p className="text-2xl font-semibold leading-snug">
            &ldquo;Your Journey. Your Choice. Your World.&rdquo;
          </p>
          <p className="mt-3 text-sm text-brand-200">
            Search, compare, book, and manage every part of your trip from
            one seamless self-service platform.
          </p>
        </blockquote>
      </div>

      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-brand-950">{title}</h1>
          <p className="mt-1 text-sm text-brand-600">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-brand-600">{footer}</div>
        </div>
      </div>
    </div>
  );
}
