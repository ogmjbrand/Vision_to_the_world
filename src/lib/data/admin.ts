export type Customer = {
  id: string;
  name: string;
  email: string;
  bookings: number;
  totalSpent: number;
  joined: string;
};

export const mockCustomers: Customer[] = [
  { id: "CU-001", name: "Amina Bello", email: "amina.bello@example.com", bookings: 5, totalSpent: 4210, joined: "2025-02-11" },
  { id: "CU-002", name: "James Okafor", email: "james.okafor@example.com", bookings: 2, totalSpent: 1380, joined: "2025-05-03" },
  { id: "CU-003", name: "Priya Nair", email: "priya.nair@example.com", bookings: 8, totalSpent: 7960, joined: "2024-11-22" },
  { id: "CU-004", name: "Carlos Mendes", email: "carlos.mendes@example.com", bookings: 1, totalSpent: 612, joined: "2026-01-09" },
  { id: "CU-005", name: "Grace Adeyemi", email: "grace.adeyemi@example.com", bookings: 4, totalSpent: 3120, joined: "2025-09-17" },
];

export type AdminBooking = {
  id: string;
  customer: string;
  type: string;
  date: string;
  status: string;
  amount: number;
  currency: string;
};

export const mockAdminBookings: AdminBooking[] = [
  { id: "BK-10234", customer: "Amina Bello", type: "Flight", date: "2026-08-14", status: "Upcoming", amount: 612, currency: "USD" },
  { id: "BK-10198", customer: "Priya Nair", type: "Hotel", date: "2026-08-14", status: "Upcoming", amount: 780, currency: "USD" },
  { id: "BK-10077", customer: "James Okafor", type: "Package", date: "2026-03-02", status: "Completed", amount: 1899, currency: "USD" },
  { id: "BK-09950", customer: "Grace Adeyemi", type: "Car Rental", date: "2025-12-11", status: "Cancelled", amount: 210, currency: "USD" },
  { id: "BK-09880", customer: "Carlos Mendes", type: "Transfer", date: "2025-11-20", status: "Completed", amount: 65, currency: "USD" },
];

export type AdminPayment = {
  id: string;
  customer: string;
  gateway: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
};

export const mockPayments: AdminPayment[] = [
  { id: "PM-5521", customer: "Amina Bello", gateway: "Stripe", amount: 612, currency: "USD", status: "Paid", date: "2026-07-08" },
  { id: "PM-5519", customer: "Priya Nair", gateway: "Stripe", amount: 1899, currency: "USD", status: "Paid", date: "2026-07-06" },
  { id: "PM-5511", customer: "James Okafor", gateway: "Cash App", amount: 210, currency: "USD", status: "Refunded", date: "2026-07-02" },
  { id: "PM-5502", customer: "Carlos Mendes", gateway: "PayPal", amount: 780, currency: "USD", status: "Paid", date: "2026-06-29" },
  { id: "PM-5498", customer: "Grace Adeyemi", gateway: "Cash App", amount: 340, currency: "USD", status: "Failed", date: "2026-06-27" },
];

export const analyticsSummary = {
  totalRevenue: 128430,
  totalBookings: 342,
  activeCustomers: 214,
  supportTickets: 7,
  monthlyRevenue: [
    { month: "Feb", value: 14200 },
    { month: "Mar", value: 16800 },
    { month: "Apr", value: 15100 },
    { month: "May", value: 19800 },
    { month: "Jun", value: 22300 },
    { month: "Jul", value: 24100 },
  ],
};

export type SupportTicket = {
  id: string;
  customer: string;
  subject: string;
  priority: string;
  status: string;
};

export const mockTickets: SupportTicket[] = [
  { id: "TK-301", customer: "James Okafor", subject: "Refund for cancelled car rental", priority: "High", status: "Open" },
  { id: "TK-298", customer: "Grace Adeyemi", subject: "Visa documentation question", priority: "Medium", status: "In Progress" },
  { id: "TK-291", customer: "Carlos Mendes", subject: "Update flight passenger name", priority: "Low", status: "Resolved" },
];
