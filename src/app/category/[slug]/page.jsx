"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import PriceCard from "@/components/PriceCard";

const PRODUCTS_API = "https://api.api-store.workers.dev/api/bazardor/products";
const CATEGORIES_API = "https://api.api-store.workers.dev/api/bazardor/categories";

const SORTS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

function EmptyState() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="text-6xl">🔍</p>
      <h2 className="mt-4 text-xl font-bold text-gray-900">
        কোনো পণ্য পাওয়া যায়নি
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        এই ক্যাটাগরিতে কোনো পণ্য নেই, অথবা ক্যাটাগরিটি সঠিক নয়।
      </p>
      <Link
        href="/"
        className="mt-5 inline-block rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-28 animate-pulse rounded-2xl bg-gray-100" />
      ))}
    </div>
  );
}

export default function CategoryPage() {
  const { slug } = useParams();
  const [sort, setSort] = useState("default");

  const products = useFetch(PRODUCTS_API);
  const categories = useFetch(CATEGORIES_API);

  const loading = products.loading || categories.loading;
  const error = products.error || categories.error;

  const category = categories.data?.find((c) => c.slug === slug);

  // category slug diye filter, tarpor sort
  const items = useMemo(() => {
    if (!products.data) return [];
    const list = products.data.filter((p) => p.category === slug);

    if (sort === "asc") return [...list].sort((a, b) => a.today - b.today);
    if (sort === "desc") return [...list].sort((a, b) => b.today - a.today);
    return list;
  }, [products.data, slug, sort]);

  return (
    <main className="container mx-auto px-3 py-6 sm:px-4">
      <Link href="/" className="text-xs text-gray-500 hover:text-green-700">
        ← হোম
      </Link>

      {loading && (
        <div className="mt-4">
          <div className="mb-4 h-8 w-48 animate-pulse rounded bg-gray-100" />
          <Skeleton />
        </div>
      )}

      {!loading && error && (
        <p className="mt-6 text-sm text-red-500">ডাটা লোড করা যায়নি</p>
      )}

      {!loading && !error && (!category || items.length === 0) && <EmptyState />}

      {!loading && !error && category && items.length > 0 && (
        <>
          {/* Title + Sort */}
          <div className="mt-3 mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-extrabold text-gray-900">
                <span>{category.icon}</span>
                {category.nameBn}
              </h1>
              <p className="mt-1 text-xs text-gray-500">
                মোট {items.length.toLocaleString("bn-BD")}টি পণ্য
              </p>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600">
              সাজান:
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-green-600"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Product list */}
          <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => (
              <PriceCard key={p.id} p={p} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}