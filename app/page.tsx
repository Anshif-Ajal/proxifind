import { supabase } from "@/lib/supabase";
import { CATEGORIES } from "@/types/database";
import ListingCard from "@/components/ListingCard";
import type { Listing } from "@/types/database";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Find Local Services Near You",
  description:
    "Browse trusted local service providers for tutoring, home repair, photography, fitness training, and more.",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q, category } = await searchParams;

  let query = supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (q && typeof q === "string") {
    query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`);
  }
  if (category && typeof category === "string") {
    query = query.eq("category", category);
  }

  const { data: listings } = await query;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Find Local Services You Can Trust
        </h1>
        <p className="text-gray-500">
          Browse tutors, photographers, handymen, and more in your area.
        </p>
      </div>

      <form className="mx-auto mb-8 max-w-xl" action="/" method="get">
        <div className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={typeof q === "string" ? q : ""}
            placeholder="Search services..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </form>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <a
          href="/"
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
            !category
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All
        </a>
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={`/?category=${encodeURIComponent(cat)}${q ? `&q=${q}` : ""}`}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              category === cat
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </a>
        ))}
      </div>

      {(listings as Listing[] | null)?.length === 0 && (
        <p className="py-16 text-center text-gray-400">
          No services found. Try a different search or category.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(listings as Listing[] | null)?.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
