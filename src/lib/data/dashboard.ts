export type Booking = {
  id: string;
  type: "Flight" | "Hotel" | "Car Rental" | "Package";
  title: string;
  date: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  amount: number;
  currency: string;
};

export const mockBookings: Booking[] = [
  {
    id: "BK-10234",
    type: "Flight",
    title: "LOS → LHR · Vision Air VW214",
    date: "2026-08-14",
    status: "Upcoming",
    amount: 612,
    currency: "USD",
  },
  {
    id: "BK-10198",
    type: "Hotel",
    title: "Grand Meridian London · 4 nights",
    date: "2026-08-14",
    status: "Upcoming",
    amount: 780,
    currency: "USD",
  },
  {
    id: "BK-10077",
    type: "Package",
    title: "Santorini Getaway · 7 days",
    date: "2026-03-02",
    status: "Completed",
    amount: 1899,
    currency: "USD",
  },
  {
    id: "BK-09950",
    type: "Car Rental",
    title: "Toyota Corolla · Cape Town",
    date: "2025-12-11",
    status: "Cancelled",
    amount: 210,
    currency: "USD",
  },
];

export const mockInvoices = mockBookings.map((b) => ({
  id: `INV-${b.id.split("-")[1]}`,
  bookingId: b.id,
  date: b.date,
  amount: b.amount,
  currency: b.currency,
}));
