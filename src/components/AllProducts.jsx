"use client";
import useFetch from "@/hooks/useFetch";
import PriceCard from "./PriceCard";


// const PRODUCTS_API = "https://api.api-store.workers.dev/api/bazardor/products";
const PRODUCTS_API = "https://openapi.programming-hero.com/api/bazardor/products";

export default function AllProducts() {
  const { data, error, loading } = useFetch(PRODUCTS_API);

  return (
    <section id="all-products" className="container mx-auto px-3 pb-10 sm:px-4">
      <h2 className="text-lg font-bold text-gray-900 sm:text-xl">সব পণ্য</h2>
      <p className="mb-4 text-xs text-gray-500">
        {data
          ? `মোট ${data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে`
          : "পণ্য লোড হচ্ছে..."}
      </p>

      {loading && (
        <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-500">পণ্য লোড করা যায়নি</p>}

      {!loading && !error && data && (
        <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((p) => (
            <PriceCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </section>
  );
}