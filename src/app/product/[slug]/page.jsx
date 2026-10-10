import { Suspense } from "react";
import ProductDetails from "@/components/ProductDetails";

function Loading() {
  return (
    <div className="container mx-auto space-y-4 px-3 py-6 sm:px-4">
      <div className="h-32 animate-pulse rounded-2xl bg-gray-100" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl bg-gray-100" />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductDetails />
    </Suspense>
  );
}