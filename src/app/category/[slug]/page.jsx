import { Suspense } from "react";
import CategoryContent from "@/components/CategoryContent";

function Loading() {
  return (
    <main className="container mx-auto px-3 py-6 sm:px-4">
      <div className="mb-4 h-8 w-48 animate-pulse rounded bg-gray-100" />
      <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-2xl bg-gray-100" />
        ))}
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CategoryContent />
    </Suspense>
  );
}