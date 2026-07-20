export default function ListingDetailLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="aspect-[21/9] bg-gray-200" />
        <div className="space-y-4 p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
            <div className="h-8 w-28 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-8 w-3/4 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="border-t border-gray-100 pt-6">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            <div className="mt-1 h-3 w-32 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-24 animate-pulse rounded-lg bg-gray-50" />
        </div>
      </div>
    </div>
  );
}
