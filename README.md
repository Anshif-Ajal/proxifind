ProxiFind 🔍
A local services marketplace where users can offer services — tutoring, home repair, photography, fitness training, and more — and others can browse, filter by category, and book time slots.
Live demo: proxifind.vercel.app (update with your actual Vercel URL)
---
Screenshots
(Add 3–4 screenshots here once deployed — homepage, listing detail, dashboard, booking flow. Drag image files directly into this section on GitHub, or use `![alt text](./screenshots/homepage.png)` syntax after adding a `screenshots/` folder to the repo.)
---
Features
Authentication — email/password sign up and sign in via Supabase Auth
Listings — create, browse, and filter services by category
Search — keyword search across all listings
Bookings — request a time slot on any listing; providers can confirm or cancel requests
Role-aware dashboard — a single account can act as both a service provider (managing their listings) and a client (tracking their bookings)
Row Level Security — database-enforced rules ensure users can only edit their own listings and view bookings relevant to them, not just UI-level restrictions
Responsive design — works across desktop and mobile screen sizes
---
Tech Stack
Layer	Technology
Frontend	Next.js 16 (App Router), TypeScript, Tailwind CSS
Backend	Next.js Server Actions + Route Handlers
Database	Supabase (PostgreSQL)
Auth	Supabase Auth (`@supabase/ssr` for server/client session handling)
Hosting	Vercel
AI-assisted development	Built using OpenCode with free-tier coding models
---
Architecture Notes
Why Supabase Row Level Security instead of only checking permissions in the UI?
Every table has RLS policies enforced at the database level — for example, a user can only `UPDATE` or `DELETE` a listing where `owner_id` matches their own auth ID. This means even if someone bypassed the frontend entirely and hit the API directly, they still couldn't modify another user's data. Security lives in the data layer, not just the interface.
Why `@supabase/ssr`?
Next.js App Router mixes server and client components, and auth state needs to be consistent across both — otherwise you get bugs like a navbar showing "Sign In" even when a user is authenticated. `@supabase/ssr` handles this via cookie-based session storage that works correctly in both environments.
---
Database Schema
```sql
listings
  id            uuid primary key
  owner_id      uuid → auth.users
  title         text
  description   text
  price         numeric
  category      text
  location      text
  image_url     text
  created_at    timestamptz

bookings
  id            uuid primary key
  listing_id    uuid → listings
  buyer_id      uuid → auth.users
  status        text (pending | confirmed | cancelled | completed)
  booking_date  date
  created_at    timestamptz
```
---
Running Locally
Prerequisites: Node.js 20+, a free Supabase account
Clone the repo:
```bash
   git clone https://github.com/Anshif-Ajal/proxifind.git
   cd proxifind
   ```
Install dependencies:
```bash
   npm install
   ```
Create a Supabase project and run the schema SQL (see `Database Schema` above, plus RLS policies — full script available in project history / on request).
Create a `.env.local` file in the project root:
```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
Run the dev server:
```bash
   npm run dev
   ```
Open http://localhost:3000
---
Project Structure
```
app/
  page.tsx                 → Homepage: search, category filters, listings grid
  auth/page.tsx             → Sign up / sign in
  listings/[id]/page.tsx    → Listing detail + booking form
  listings/new/page.tsx     → Create listing form
  dashboard/page.tsx        → Tabbed view: My Listings / My Bookings
  actions.ts                → Server actions for auth, listings, bookings
components/
  Navbar.tsx                → Auth-aware navigation
  ListingCard.tsx            → Reusable listing preview card
lib/
  supabase.ts                → Supabase client setup (server + browser)
types/
  database.ts                 → TypeScript types matching the DB schema
```
---
Future Improvements
[ ] Payment integration (Razorpay) for confirmed bookings
[ ] Image upload via Supabase Storage instead of external URLs
[ ] Ratings and reviews on completed bookings
[ ] Email notifications on booking status changes
[ ] Provider availability calendar instead of free-form date picking
---
Author
Built by Anshif Ajal.


