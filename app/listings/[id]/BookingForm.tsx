"use client";

import { useActionState } from "react";
import { createBooking } from "@/app/actions";

export default function BookingForm({
  listing,
}: {
  listing: {
    id: string;
    owner_id: string;
    title: string;
  };
}) {
  const [state, formAction, pending] = useActionState(createBooking, null);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold text-gray-900">Book Now</h2>
      {state?.success && (
        <div className="mb-3 rounded-lg bg-green-50 p-3 text-sm text-green-700">
          Booking request sent! Check your dashboard for updates.
        </div>
      )}
      {state?.error && (
        <div className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {state.error}
        </div>
      )}
      <form action={formAction} className="space-y-3">
        <input type="hidden" name="listing_id" value={listing.id} />

        <div>
          <label
            htmlFor="booking_date"
            className="mb-1 block text-xs font-medium text-gray-600"
          >
            Date
          </label>
          <input
            id="booking_date"
            name="booking_date"
            type="date"
            min={today}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {pending ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
}
