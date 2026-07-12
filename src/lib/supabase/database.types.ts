/**
 * Generated via `mcp__Supabase__generate_typescript_types` against project
 * nojjlnekwtfampxyfcmg. Regenerate the `Database` type after schema changes;
 * keep the hand-written aliases below in sync with the check constraints in
 * supabase/migrations/*.sql (the generator doesn't turn Postgres CHECK
 * constraints into TS unions).
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      bookings: {
        Row: {
          created_at: string;
          currency: string;
          id: string;
          metadata: Json;
          reminder_7d_sent_at: string | null;
          reminder_24h_sent_at: string | null;
          service_fee: number;
          status: string;
          stripe_session_id: string | null;
          subtotal: number;
          title: string;
          total: number;
          travel_date: string | null;
          type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          currency?: string;
          id?: string;
          metadata?: Json;
          reminder_7d_sent_at?: string | null;
          reminder_24h_sent_at?: string | null;
          service_fee: number;
          status?: string;
          stripe_session_id?: string | null;
          subtotal: number;
          title: string;
          total: number;
          travel_date?: string | null;
          type: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          currency?: string;
          id?: string;
          metadata?: Json;
          reminder_7d_sent_at?: string | null;
          reminder_24h_sent_at?: string | null;
          service_fee?: number;
          status?: string;
          stripe_session_id?: string | null;
          subtotal?: number;
          title?: string;
          total?: number;
          travel_date?: string | null;
          type?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      email_logs: {
        Row: {
          attempts: number;
          created_at: string;
          error: string | null;
          id: string;
          metadata: Json;
          provider_id: string | null;
          recipient: string;
          status: string;
          type: string;
        };
        Insert: {
          attempts?: number;
          created_at?: string;
          error?: string | null;
          id?: string;
          metadata?: Json;
          provider_id?: string | null;
          recipient: string;
          status: string;
          type: string;
        };
        Update: {
          attempts?: number;
          created_at?: string;
          error?: string | null;
          id?: string;
          metadata?: Json;
          provider_id?: string | null;
          recipient?: string;
          status?: string;
          type?: string;
        };
        Relationships: [];
      };
      newsletter_campaigns: {
        Row: {
          created_at: string;
          failure_count: number;
          headline: string;
          id: string;
          intro: string;
          recipient_count: number;
          sent_by: string | null;
          success_count: number;
        };
        Insert: {
          created_at?: string;
          failure_count?: number;
          headline: string;
          id?: string;
          intro: string;
          recipient_count?: number;
          sent_by?: string | null;
          success_count?: number;
        };
        Update: {
          created_at?: string;
          failure_count?: number;
          headline?: string;
          id?: string;
          intro?: string;
          recipient_count?: number;
          sent_by?: string | null;
          success_count?: number;
        };
        Relationships: [];
      };
      invoices: {
        Row: {
          amount: number;
          booking_id: string;
          currency: string;
          id: string;
          invoice_number: string;
          issued_at: string;
          user_id: string;
        };
        Insert: {
          amount: number;
          booking_id: string;
          currency?: string;
          id?: string;
          invoice_number: string;
          issued_at?: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          booking_id?: string;
          currency?: string;
          id?: string;
          invoice_number?: string;
          issued_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invoices_booking_id_fkey";
            columns: ["booking_id"];
            isOneToOne: false;
            referencedRelation: "bookings";
            referencedColumns: ["id"];
          },
        ];
      };
      payments: {
        Row: {
          amount: number;
          booking_id: string;
          created_at: string;
          currency: string;
          gateway: string;
          gateway_reference: string | null;
          id: string;
          status: string;
          user_id: string;
        };
        Insert: {
          amount: number;
          booking_id: string;
          created_at?: string;
          currency?: string;
          gateway: string;
          gateway_reference?: string | null;
          id?: string;
          status?: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          booking_id?: string;
          created_at?: string;
          currency?: string;
          gateway?: string;
          gateway_reference?: string | null;
          id?: string;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey";
            columns: ["booking_id"];
            isOneToOne: false;
            referencedRelation: "bookings";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string | null;
          full_name: string | null;
          id: string;
          newsletter_opt_in: boolean;
          phone: string | null;
          role: string;
          updated_at: string;
          welcome_email_sent_at: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id: string;
          newsletter_opt_in?: boolean;
          phone?: string | null;
          role?: string;
          updated_at?: string;
          welcome_email_sent_at?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          newsletter_opt_in?: boolean;
          phone?: string | null;
          role?: string;
          updated_at?: string;
          welcome_email_sent_at?: string | null;
        };
        Relationships: [];
      };
      support_tickets: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          message: string;
          name: string;
          priority: string;
          status: string;
          subject: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          message: string;
          name: string;
          priority?: string;
          status?: string;
          subject?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          message?: string;
          name?: string;
          priority?: string;
          status?: string;
          subject?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      customer_summary: {
        Row: {
          bookings_count: number | null;
          email: string | null;
          full_name: string | null;
          id: string | null;
          joined_at: string | null;
          role: string | null;
          total_spent: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      is_admin: { Args: never; Returns: boolean };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// Hand-written unions mirroring the CHECK constraints in
// supabase/migrations/20260711005849_init_schema.sql (Postgres CHECK
// constraints aren't reflected in the generated types above).
export type BookingStatus = "upcoming" | "completed" | "cancelled" | "pending_confirmation";
export type PaymentGateway = "stripe" | "paypal" | "cashapp";
export type PaymentStatus = "paid" | "pending" | "refunded" | "failed";
export type TicketStatus = "open" | "in_progress" | "resolved";
export type TicketPriority = "low" | "medium" | "high";
export type ProfileRole = "customer" | "admin";
export type EmailType =
  | "welcome"
  | "booking_confirmation"
  | "invoice"
  | "trip_reminder"
  | "newsletter"
  | "contact_notification"
  | "contact_auto_reply";
export type EmailLogStatus = "sent" | "failed";
