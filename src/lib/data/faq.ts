export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  category: string;
  items: FaqItem[];
};

export const faqs: FaqCategory[] = [
  {
    category: "Booking",
    items: [
      {
        question: "How do I book a flight, hotel, or car rental?",
        answer:
          "Search from the homepage or the relevant service page, compare real-time results, and select the option you want. You'll review your order and complete payment at checkout — no phone calls or agents required, though our travel consultants are available if you'd like help.",
      },
      {
        question: "Do I need an account to book?",
        answer:
          "You can browse and search without an account, but you'll need to sign in to complete checkout so we can attach the booking, invoice, and confirmation to your dashboard.",
      },
      {
        question: "Can I book for someone else, like family members?",
        answer:
          "Yes. Enter each traveler's details exactly as they appear on their passport or government ID during checkout.",
      },
    ],
  },
  {
    category: "Payments",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept Stripe (credit/debit cards), PayPal, and Cash App. Card and PayPal payments confirm instantly; Cash App payments are confirmed manually by our team within one business day.",
      },
      {
        question: "Why is there a 5% service fee?",
        answer:
          "The service fee covers platform operations, secure payment processing, and customer support, and is shown clearly before you pay — there are no hidden charges.",
      },
      {
        question: "Is it safe to enter my payment details?",
        answer:
          "Yes. Card and PayPal payments are handled directly by Stripe and PayPal's secure, PCI-compliant systems — we never store your full card number on our servers.",
      },
    ],
  },
  {
    category: "Changes & Refunds",
    items: [
      {
        question: "Can I cancel or change my booking?",
        answer:
          "Cancellations and changes are subject to the airline, hotel, or supplier's own fare rules, which are shown before you pay. See our Refund Policy for full details, or contact support for help with a specific booking.",
      },
      {
        question: "How long do refunds take?",
        answer:
          "Once a refund is approved by the supplier, Stripe and PayPal refunds typically post within 5–10 business days. The 5% service fee is non-refundable once a booking is confirmed.",
      },
    ],
  },
  {
    category: "Visas & Insurance",
    items: [
      {
        question: "Can you guarantee my visa will be approved?",
        answer:
          "No one can guarantee visa approval — that decision rests solely with the relevant embassy or consulate. Our visa assistance service helps you understand requirements and prepare accurate documentation to give you the best chance of a smooth application.",
      },
      {
        question: "Is travel insurance required?",
        answer:
          "Travel insurance is optional unless your destination requires it for entry. You can add it during checkout for medical, cancellation, and emergency coverage from our insurance partners.",
      },
    ],
  },
  {
    category: "Account & Support",
    items: [
      {
        question: "Where can I find my booking confirmations and invoices?",
        answer:
          "Sign in and open your dashboard — every booking, invoice, and payment is listed there, and a confirmation email is sent automatically once payment clears.",
      },
      {
        question: "How do I reach a real person?",
        answer:
          "Use the contact form, WhatsApp, or phone numbers on our Contact page to reach our support team, or request to speak with a travel consultant for personalized help.",
      },
    ],
  },
];
