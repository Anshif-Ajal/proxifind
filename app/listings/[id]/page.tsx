import { createServerSupabaseClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import BookingForm from "./BookingForm";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: listing } = await supabase
    .from("listings")
    .select("title, description")
    .eq("id", id)
    .single();
  if (!listing) return { title: "Listing Not Found" };
  return {
    title: listing.title,
    description: listing.description.slice(0, 160),
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createServerSupabaseClient();
  const { id } = await params;

  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  if (!listing) notFound();

  const { data: provider } = await supabase
    .from("listings")
    .select("owner_id")
    .eq("id", id)
    .single();

  const { data: { user } } = await supabase.auth.getUser();

  const isOwner = user?.id === listing.owner_id;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {listing.image_url ? (
          <div className="aspect-[21/9] overflow-hidden bg-gray-100">
            <img
              src={listing.image_url}
              alt={listing.title}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="flex aspect-[21/9] items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 text-6xl font-bold text-indigo-200">
            {listing.title.charAt(0)}
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
              {listing.category}
            </span>
            <span className="text-2xl font-bold text-indigo-600">
              ${listing.price}
              <span className="text-sm font-normal text-gray-500">/hr</span>
            </span>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            {listing.title}
          </h1>
          <div className="mb-4 flex items-center gap-1 text-sm text-gray-400">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {listing.location}
          </div>

          <p className="whitespace-pre-wrap text-gray-600 leading-relaxed">
            {listing.description}
          </p>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <h2 className="mb-1 text-sm font-semibold text-gray-900">
              Provider
            </h2>
            <p className="text-sm text-gray-500">{listing.owner_id.slice(0, 8)}...</p>
          </div>

          <div className="mt-6">
            {isOwner ? (
              <p className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-500">
                This is your listing. View bookings in your{" "}
                <a href="/dashboard" className="font-medium text-indigo-600">
                  dashboard
                </a>
                .
              </p>
            ) : (
              <BookingForm listing={listing} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
