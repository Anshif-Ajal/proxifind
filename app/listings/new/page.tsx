"use client";

import { useActionState, useState, useEffect } from "react";
import { createListing } from "@/app/actions";
import { CATEGORIES } from "@/types/database";

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  price?: string;
  location?: string;
  image_url?: string;
}

function validate(formData: FormData): FormErrors {
  const errors: FormErrors = {};
  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const category = formData.get("category") as string;
  const price = formData.get("price") as string;
  const location = (formData.get("location") as string)?.trim();
  const imageUrl = (formData.get("image_url") as string)?.trim();

  if (!title) {
    errors.title = "Service title is required.";
  } else if (title.length < 3) {
    errors.title = "Title must be at least 3 characters.";
  }

  if (!description) {
    errors.description = "Description is required.";
  } else if (description.length < 10) {
    errors.description = "Description must be at least 10 characters.";
  }

  if (!category) {
    errors.category = "Please select a category.";
  }

  if (!price) {
    errors.price = "Price is required.";
  } else {
    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      errors.price = "Price must be a positive number.";
    }
  }

  if (!location) {
    errors.location = "Location is required.";
  }

  if (imageUrl && !/^https?:\/\/.+/.test(imageUrl)) {
    errors.image_url = "Please enter a valid URL starting with http:// or https://.";
  }

  return errors;
}

export default function NewListingPage() {
  const [state, formAction, pending] = useActionState(createListing, null);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  useEffect(() => {
    document.title = "Offer a Service - ProxiFind";
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errors = validate(formData);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    formAction(formData);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Offer a Service
      </h1>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {state?.error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {state.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Service Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Math Tutoring for High School Students"
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none ${
                fieldErrors.title
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            />
            {fieldErrors.title && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Describe your service, experience, and what clients can expect..."
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none ${
                fieldErrors.description
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            />
            {fieldErrors.description && (
              <p className="mt-1 text-xs text-red-600">
                {fieldErrors.description}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="category"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none ${
                  fieldErrors.category
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {fieldErrors.category && (
                <p className="mt-1 text-xs text-red-600">
                  {fieldErrors.category}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="price"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Price ($/hr)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step={1}
                placeholder="25"
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none ${
                  fieldErrors.price
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
              />
              {fieldErrors.price && (
                <p className="mt-1 text-xs text-red-600">
                  {fieldErrors.price}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="location"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="e.g. Downtown Austin, TX"
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none ${
                fieldErrors.location
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            />
            {fieldErrors.location && (
              <p className="mt-1 text-xs text-red-600">
                {fieldErrors.location}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="image_url"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Image URL{" "}
              <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <input
              id="image_url"
              name="image_url"
              type="url"
              placeholder="https://example.com/photo.jpg"
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none ${
                fieldErrors.image_url
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            />
            {fieldErrors.image_url && (
              <p className="mt-1 text-xs text-red-600">
                {fieldErrors.image_url}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {pending ? "Creating..." : "Create Listing"}
          </button>
        </form>
      </div>
    </div>
  );
}
