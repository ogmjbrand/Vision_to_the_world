"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plane, Hotel, Car, BusFront, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "flights" | "hotels" | "car-rental" | "airport-transfers";

const tabs: { id: Tab; label: string; icon: typeof Plane }[] = [
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels", label: "Hotels", icon: Hotel },
  { id: "car-rental", label: "Car Rental", icon: Car },
  { id: "airport-transfers", label: "Transfers", icon: BusFront },
];

const inputClass =
  "w-full rounded-lg border border-brand-200 bg-white px-3 py-2.5 text-sm text-brand-950 placeholder:text-brand-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";
const labelClass = "mb-1 block text-xs font-semibold text-brand-600";

export default function SearchWidget() {
  const [tab, setTab] = useState<Tab>("flights");
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    data.forEach((value, key) => {
      if (value) params.set(key, String(value));
    });
    router.push(`/${tab}?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-4xl rounded-2xl bg-white/95 p-3 shadow-2xl ring-1 ring-black/5 sm:p-5">
      <div className="flex gap-1 overflow-x-auto pb-3">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors",
              tab === id
                ? "bg-brand-950 text-white"
                : "text-brand-700 hover:bg-brand-50",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} key={tab} className="grid gap-3">
        {tab === "flights" && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
            <div className="sm:col-span-1">
              <label className={labelClass}>From</label>
              <input
                name="origin"
                required
                placeholder="e.g. LOS"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-1">
              <label className={labelClass}>To</label>
              <input
                name="destination"
                required
                placeholder="e.g. LHR"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-1">
              <label className={labelClass}>Depart</label>
              <input type="date" name="date" required className={inputClass} />
            </div>
            <div className="sm:col-span-1">
              <label className={labelClass}>Return (optional)</label>
              <input type="date" name="returnDate" className={inputClass} />
            </div>
            <div className="sm:col-span-1">
              <label className={labelClass}>Travelers</label>
              <input
                type="number"
                name="travelers"
                min={1}
                defaultValue={1}
                className={inputClass}
              />
            </div>
          </div>
        )}

        {tab === "hotels" && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            <div className="sm:col-span-1">
              <label className={labelClass}>Destination</label>
              <input
                name="destination"
                required
                placeholder="City or hotel"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-1">
              <label className={labelClass}>Check-in</label>
              <input type="date" name="checkIn" required className={inputClass} />
            </div>
            <div className="sm:col-span-1">
              <label className={labelClass}>Check-out</label>
              <input type="date" name="checkOut" required className={inputClass} />
            </div>
            <div className="sm:col-span-1">
              <label className={labelClass}>Guests</label>
              <input
                type="number"
                name="guests"
                min={1}
                defaultValue={2}
                className={inputClass}
              />
            </div>
          </div>
        )}

        {tab === "car-rental" && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            <div className="sm:col-span-1">
              <label className={labelClass}>Pickup location</label>
              <input
                name="location"
                required
                placeholder="City or airport"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-1">
              <label className={labelClass}>Pickup date</label>
              <input type="date" name="pickupDate" required className={inputClass} />
            </div>
            <div className="sm:col-span-1">
              <label className={labelClass}>Return date</label>
              <input type="date" name="returnDate" required className={inputClass} />
            </div>
            <div className="sm:col-span-1">
              <label className={labelClass}>Vehicle type</label>
              <select name="vehicleType" className={inputClass} defaultValue="economy">
                <option value="economy">Economy</option>
                <option value="suv">SUV</option>
                <option value="luxury">Luxury</option>
                <option value="van">Van / Minibus</option>
              </select>
            </div>
          </div>
        )}

        {tab === "airport-transfers" && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            <div className="sm:col-span-1">
              <label className={labelClass}>Airport</label>
              <input
                name="airport"
                required
                placeholder="e.g. JFK"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-1">
              <label className={labelClass}>Drop-off address</label>
              <input
                name="dropoff"
                required
                placeholder="Hotel or address"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-1">
              <label className={labelClass}>Date</label>
              <input type="date" name="date" required className={inputClass} />
            </div>
            <div className="sm:col-span-1">
              <label className={labelClass}>Time</label>
              <input type="time" name="time" required className={inputClass} />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600 sm:w-fit sm:px-8"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </form>
    </div>
  );
}
