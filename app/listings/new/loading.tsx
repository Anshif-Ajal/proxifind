export default function NewListingLoading() {
  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="mb-6 h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
      <div className="animate-pulse space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-24 w-full animate-pulse rounded-lg bg-gray-200" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
        </div>
        <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}
