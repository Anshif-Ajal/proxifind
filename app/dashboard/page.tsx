import { createServerSupabaseClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import Link from "next/link";
import DashboardTabs from "./DashboardTabs";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your listings and bookings.",
};

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  const { data: bookingsAsUser } = await supabase
    .from("bookings")
    .select("*, listings!inner(id, title, price, category)")
    .eq("buyer_id", user.id)
    .order("created_at", { ascending: false });

  const { data: bookingsAsProvider } = await supabase
    .from("bookings")
    .select("*, listings!inner(id, title, price, category, owner_id)")
    .eq("listings.owner_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link
          href="/listings/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          + New Listing
        </Link>
      </div>

      <DashboardTabs
        listings={listings ?? []}
        bookingsAsUser={bookingsAsUser ?? []}
        bookingsAsProvider={bookingsAsProvider ?? []}
      />
    </div>
  );
}
