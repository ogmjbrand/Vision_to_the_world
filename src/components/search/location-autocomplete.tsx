"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

type Suggestion = {
  iataCode: string;
  name: string;
  cityName: string;
  countryName: string;
  subType: "AIRPORT" | "CITY";
};

const inputClass =
  "w-full rounded-lg border border-brand-200 bg-white py-2.5 pl-9 pr-3 text-sm text-brand-950 placeholder:text-brand-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";
const labelClass = "mb-1 block text-xs font-semibold text-brand-600";

export default function LocationAutocomplete({
  name,
  label,
  placeholder,
  defaultValue = "",
  required,
  subTypeFilter,
}: {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  /** Restrict suggestions to a single location type (e.g. "CITY" for hotel search, which needs a city code rather than an airport code). */
  subTypeFilter?: "AIRPORT" | "CITY";
}) {
  const [query, setQuery] = useState(defaultValue);
  const [hiddenValue, setHiddenValue] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;

      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      fetch(`/api/locations/search?keyword=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data: { source?: string; results?: Suggestion[] }) => {
          const results = data.results ?? [];
          // Subtype data is only reliable from the live Amadeus API — the
          // offline fallback list doesn't distinguish city vs. airport codes.
          const filtered =
            subTypeFilter && data.source === "amadeus"
              ? results.filter((r) => r.subType === subTypeFilter)
              : results;
          if (!cancelled) setSuggestions(filtered);
        })
        .catch(() => {
          if (!cancelled) setSuggestions([]);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, subTypeFilter]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(s: Suggestion) {
    setQuery(`${s.cityName} (${s.iataCode})`);
    setHiddenValue(s.iataCode);
    setSuggestions([]);
    setOpen(false);
  }

  return (
    <div className="relative" ref={containerRef}>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHiddenValue(e.target.value.toUpperCase());
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          className={inputClass}
        />
      </div>
      <input type="hidden" name={name} value={hiddenValue} />

      {open && (loading || suggestions.length > 0) && (
        <div className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-brand-100 bg-white py-1 shadow-xl">
          {loading && <p className="px-3 py-2 text-xs text-brand-400">Searching worldwide...</p>}
          {!loading &&
            suggestions.map((s) => (
              <button
                key={`${s.iataCode}-${s.subType}`}
                type="button"
                onClick={() => handleSelect(s)}
                className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-brand-50"
              >
                <span>
                  <span className="font-medium text-brand-950">{s.cityName}</span>
                  <span className="text-brand-400"> &middot; {s.countryName}</span>
                </span>
                <span className="rounded bg-brand-50 px-1.5 py-0.5 text-xs font-semibold text-brand-600">
                  {s.iataCode}
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
