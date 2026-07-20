"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteListing, updateBookingStatus } from "@/app/actions";
import type { Listing, Booking } from "@/types/database";

type BookingWithListing = Booking & {
  listings: { id: string; title: string; price: number; category: string };
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

export default function DashboardTabs({
  listings,
  bookingsAsUser,
  bookingsAsProvider,
}: {
  listings: Listing[];
  bookingsAsUser: BookingWithListing[];
  bookingsAsProvider: BookingWithListing[];
}) {
  const [tab, setTab] = useState<"listings" | "bookings">("listings");
  const router = useRouter();

  async function handleDelete(id: string) {
    await deleteListing(id);
    router.refresh();
  }

  async function handleStatus(bookingId: string, status: string) {
    await updateBookingStatus(bookingId, status);
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setTab("listings")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${
            tab === "listings"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          My Listings ({listings.length})
        </button>
        <button
          onClick={() => setTab("bookings")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${
            tab === "bookings"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          My Bookings ({bookingsAsUser.length})
        </button>
      </div>

      {tab === "listings" && (
        <div>
          {listings.length === 0 ? (
            <p className="py-12 text-center text-gray-400">
              No listings yet.{" "}
              <Link
                href="/listings/new"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Create your first listing
              </Link>
            </p>
          ) : (
            <div className="space-y-3">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4"
                >
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/listings/${listing.id}`}
                      className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
                    >
                      {listing.title}
                    </Link>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-400">
                      <span>{listing.category}</span>
                      <span>-</span>
                      <span>{formatPrice(listing.price)}/hr</span>
                      <span>-</span>
                      <span>{listing.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(listing.id)}
                    className="ml-4 rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                    title="Delete listing"
                  >
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "bookings" && (
        <div>
          {bookingsAsUser.length === 0 ? (
            <p className="py-12 text-center text-gray-400">
              No bookings yet. Browse{" "}
              <Link
                href="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                available services
              </Link>{" "}
              to get started.
            </p>
          ) : (
            <div className="space-y-3">
              {bookingsAsUser.map((booking) => {
                const colorClass =
                  STATUS_COLORS[booking.status] || STATUS_COLORS.pending;
                return (
                  <div
                    key={booking.id}
                    className="rounded-xl border border-gray-200 bg-white p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <Link
                          href={`/listings/${booking.listing_id}`}
                          className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
                        >
                          {booking.listings.title}
                        </Link>
                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                          <span>{booking.booking_date}</span>
                          <span>-</span>
                          <span>
                            {formatPrice(booking.listings.price)}/hr
                          </span>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    {booking.status === "confirmed" && (
                      <div className="mt-3">
                        <button
                          onClick={() =>
                            handleStatus(booking.id, "completed")
                          }
                          className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100"
                        >
                          Mark Completed
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {bookingsAsProvider.length > 0 && (
            <>
              <h2 className="mt-8 mb-3 text-sm font-semibold text-gray-900">
                Bookings as Provider
              </h2>
              <div className="space-y-3">
                {bookingsAsProvider.map((booking) => {
                  const colorClass =
                    STATUS_COLORS[booking.status] || STATUS_COLORS.pending;
                  return (
                    <div
                      key={booking.id}
                      className="rounded-xl border border-gray-200 bg-white p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <Link
                            href={`/listings/${booking.listing_id}`}
                            className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
                          >
                            {booking.listings.title}
                          </Link>
                          <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                            <span>{booking.booking_date}</span>
                          </div>
                          <p className="mt-1 text-xs text-gray-400">
                            Booked by: {booking.buyer_id.slice(0, 8)}...
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      {booking.status === "pending" && (
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() =>
                              handleStatus(booking.id, "confirmed")
                            }
                            className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleStatus(booking.id, "cancelled")
                            }
                            className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
