export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex animate-pulse items-center justify-between">
        <div className="h-8 w-40 rounded-lg bg-gray-200" />
        <div className="h-10 w-36 rounded-lg bg-gray-200" />
      </div>
      <div className="mb-6 flex animate-pulse gap-1 rounded-lg bg-gray-100 p-1">
        <div className="h-10 flex-1 rounded-md bg-gray-200" />
        <div className="h-10 flex-1 rounded-md bg-gray-200" />
      </div>
      <div className="animate-pulse space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 rounded bg-gray-200" />
                <div className="h-3 w-32 rounded bg-gray-200" />
              </div>
              <div className="ml-4 h-8 w-8 rounded-lg bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
