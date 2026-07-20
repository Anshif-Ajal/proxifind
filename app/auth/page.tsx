"use client";

import { useActionState, useState, useEffect } from "react";
import { signIn, signUp } from "../actions";

interface FormErrors {
  full_name?: string;
  email?: string;
  password?: string;
}

function validate(mode: "signin" | "signup", formData: FormData): FormErrors {
  const errors: FormErrors = {};
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (mode === "signup") {
    const fullName = (formData.get("full_name") as string)?.trim();
    if (!fullName) {
      errors.full_name = "Full name is required.";
    }
  }

  return errors;
}

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [state, formAction, pending] = useActionState(
    mode === "signin" ? signIn : signUp,
    null
  );
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  useEffect(() => {
    document.title =
      mode === "signin" ? "Sign In - ProxiFind" : "Sign Up - ProxiFind";
  }, [mode]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errors = validate(mode, formData);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    formAction(formData);
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="mb-1 text-2xl font-bold text-gray-900">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mb-6 text-sm text-gray-500">
            {mode === "signin"
              ? "Sign in to access your dashboard and bookings."
              : "Sign up to start offering or booking services."}
          </p>

          {state?.error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {state.error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label
                  htmlFor="full_name"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none ${
                    fieldErrors.full_name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  }`}
                />
                {fieldErrors.full_name && (
                  <p className="mt-1 text-xs text-red-600">
                    {fieldErrors.full_name}
                  </p>
                )}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none ${
                  fieldErrors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                minLength={6}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none ${
                  fieldErrors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
              />
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {pending
                ? "Loading..."
                : mode === "signin"
                  ? "Sign In"
                  : "Create Account"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            {mode === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => {
                    setMode("signup");
                    setFieldErrors({});
                  }}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setMode("signin");
                    setFieldErrors({});
                  }}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
