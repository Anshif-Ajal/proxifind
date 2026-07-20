"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    supabase.auth
      .getUser()
      .then((result: { data: { user: User | null } }) =>
        setUser(result.data.user)
      );
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-xl font-bold text-indigo-600"
          onClick={closeMenu}
        >
          ProxiFind
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/listings/new"
            className="text-sm font-medium text-gray-600 hover:text-indigo-600"
          >
            Offer a Service
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-600 hover:text-indigo-600"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              href="/listings/new"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
            >
              Offer a Service
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                onClick={closeMenu}
                className="rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
