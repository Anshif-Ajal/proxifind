import Link from "next/link";
import type { Listing } from "@/types/database";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

const CATEGORY_COLORS: Record<string, string> = {
  Tutoring: "bg-blue-100 text-blue-700",
  "Home Repair": "bg-amber-100 text-amber-700",
  Photography: "bg-purple-100 text-purple-700",
  "Fitness Training": "bg-green-100 text-green-700",
  Cleaning: "bg-cyan-100 text-cyan-700",
  Cooking: "bg-orange-100 text-orange-700",
  Moving: "bg-rose-100 text-rose-700",
  Landscaping: "bg-emerald-100 text-emerald-700",
  "Pet Care": "bg-pink-100 text-pink-700",
  "Tech Support": "bg-indigo-100 text-indigo-700",
  "Music Lessons": "bg-violet-100 text-violet-700",
  Other: "bg-gray-100 text-gray-700",
};

export default function ListingCard({ listing }: { listing: Listing }) {
  const colorClass =
    CATEGORY_COLORS[listing.category] || CATEGORY_COLORS.Other;

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      {listing.image_url ? (
        <div className="aspect-[16/10] overflow-hidden bg-gray-100">
          <img
            src={listing.image_url}
            alt={listing.title}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 text-3xl font-bold text-indigo-200">
          {listing.title.charAt(0)}
        </div>
      )}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
          >
            {listing.category}
          </span>
          <span className="text-sm font-semibold text-indigo-600">
            {formatPrice(listing.price)}
            <span className="font-normal text-gray-500">/hr</span>
          </span>
        </div>
        <h3 className="mb-1 text-base font-semibold text-gray-900 truncate">
          {listing.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {listing.description}
        </p>
        <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
          <svg
            className="h-3.5 w-3.5"
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
      </div>
    </Link>
  );
}
