"use server";

import { createServerSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signUp(prevState: { error: string } | null, formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });

  if (error) return { error: error.message };
  redirect("/dashboard");
}

export async function signIn(prevState: { error: string } | null, formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message };
  redirect("/dashboard");
}

export async function createListing(prevState: { error: string } | null, formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in." };

  const { error } = await supabase.from("listings").insert({
    owner_id: user.id,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    price: Number(formData.get("price")),
    location: formData.get("location") as string,
    image_url: (formData.get("image_url") as string) || null,
  });

  if (error) return { error: error.message };
  redirect("/dashboard");
}

export async function deleteListing(listingId: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("listings").delete().eq("id", listingId).eq("owner_id", user.id);
  revalidatePath("/dashboard");
}

export async function createBooking(
  prevState: { error: string; success?: boolean } | null,
  formData: FormData
) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in to book." };

  const listingId = formData.get("listing_id") as string;
  const bookingDate = formData.get("booking_date") as string;

  const { data: listing } = await supabase
    .from("listings")
    .select("owner_id")
    .eq("id", listingId)
    .single();

  if (listing && listing.owner_id === user.id) {
    return { error: "You cannot book your own service." };
  }

  const { error } = await supabase.from("bookings").insert({
    listing_id: listingId,
    buyer_id: user.id,
    booking_date: bookingDate,
    status: "pending",
  });

  if (error) return { error: error.message };
  return { error: "", success: true };
}

export async function updateBookingStatus(bookingId: string, status: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data: booking } = await supabase
    .from("bookings")
    .select("buyer_id, listings!inner(owner_id)")
    .eq("id", bookingId)
    .single();

  if (!booking) return;
  const ownerId = (booking.listings as Array<{ owner_id: string }>)[0]?.owner_id;
  if (booking.buyer_id !== user.id && ownerId !== user.id) return;

  await supabase
    .from("bookings")
    .update({ status })
    .eq("id", bookingId);
  revalidatePath("/dashboard");
}
