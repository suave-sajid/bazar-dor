"use client";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

// const CATEGORIES_API =
  // "https://api.api-store.workers.dev/api/bazardor/categories";
    const CATEGORIES_API =
      "https://openapi.programming-hero.com/api/bazardor/categories";

export default function CategoryNav() {
  const { data, error, loading } = useFetch(CATEGORIES_API);

  return (
    <div className="border-b border-gray-200 bg-gray-100">
      <div className="container mx-auto px-3 py-2 sm:px-4 sm:py-3">
        {loading && (
          <div className="flex gap-2 overflow-hidden md:grid md:grid-cols-4 lg:flex lg:gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-24 shrink-0 animate-pulse rounded-full bg-gray-200 md:w-full lg:w-24"
              />
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500">ক্যাটাগরি লোড করা যায়নি</p>
        )}

        {!loading && !error && data && (
          <ul
            className="
              flex gap-2 overflow-x-auto pb-1
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              md:grid md:grid-cols-4 md:overflow-visible md:pb-0
              lg:flex lg:flex-wrap lg:justify-center lg:gap-3
            "
          >
            {data.map((cat) => (
              <li key={cat.id} className="shrink-0 md:shrink">
                <Link
                  href={`/category/${cat.slug}`}
                  className="
                    flex items-center gap-1.5 whitespace-nowrap rounded-full
                    bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm
                    transition hover:bg-green-600 hover:text-white
                    sm:gap-2 sm:px-4 sm:py-2 sm:text-sm
                    md:w-full md:justify-center
                    lg:w-auto
                  "
                >
                  <span className="text-sm sm:text-base">{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}