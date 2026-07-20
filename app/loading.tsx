export default function HomeLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-2 h-9 w-80 animate-pulse rounded-lg bg-gray-200" />
        <div className="mx-auto h-5 w-96 animate-pulse rounded-lg bg-gray-200" />
      </div>
      <div className="mx-auto mb-8 max-w-xl">
        <div className="flex gap-2">
          <div className="h-11 flex-1 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-11 w-24 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-gray-200" />
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="aspect-[16/10] bg-gray-200" />
            <div className="space-y-3 p-4">
              <div className="flex items-center justify-between">
                <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200" />
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
