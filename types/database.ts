export type Listing = {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  location: string;
  image_url: string | null;
  created_at: string;
};

export type Booking = {
  id: string;
  listing_id: string;
  buyer_id: string;
  booking_date: string;
  status: string;
  created_at: string;
};

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
};

export const CATEGORIES = [
  "Tutoring",
  "Home Repair",
  "Photography",
  "Fitness Training",
  "Cleaning",
  "Cooking",
  "Moving",
  "Landscaping",
  "Pet Care",
  "Tech Support",
  "Music Lessons",
  "Other",
] as const;
