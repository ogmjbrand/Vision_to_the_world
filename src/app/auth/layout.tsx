import type { Metadata } from "next";

// login/sign-up/reset-password/update-password are all client components
// (they need form state), so metadata can't be exported from the pages
// themselves — this shared layout is the one place to keep auth pages out
// of search results without touching each page file.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
