/** Spread into a page's `metadata` export: `{ ...canonicalFor("/flights"), ... }`. Resolves against metadataBase in the root layout. */
export function canonicalFor(path: string) {
  return { alternates: { canonical: path } };
}
