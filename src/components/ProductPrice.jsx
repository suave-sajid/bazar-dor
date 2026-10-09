"use client";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

const PRODUCTS_API = "https://api.api-store.workers.dev/api/bazardor/products";

const UNIT_BN = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };
const toBn = (n) => Number(n).toLocaleString("bn-BD");

function PriceCard({ p }) {
  const isUp = p.change.dir === "up";

  return (
    <Link
      href={`/products/${p.slug}`}
      className="block rounded-2xl bg-white p-3 shadow-md ring-1 ring-gray-100 transition hover:shadow-lg sm:p-4"
    >
      {/* Top: icon + name + unit */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl">
          {p.image}
        </div>
        <div className="min-w-0 leading-tight">
          <h3 className="truncate text-sm font-semibold text-gray-900">
            {p.nameBn}
          </h3>
          <p className="text-[11px] text-gray-500">
            প্রতি {UNIT_BN[p.unit] ?? p.unit}
          </p>
        </div>
      </div>

      {/* Bottom: price + badge */}
      <div className="mt-3">
        <p className="text-[10px] text-gray-400">আজকের দাম</p>
        <div className="flex items-end justify-between gap-2">
          <p className="text-base font-bold text-gray-900 sm:text-lg">
            {toBn(p.today)}{" "}
            <span className="text-xs font-medium text-gray-600">টাকা</span>
          </p>
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              isUp ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"
            }`}
          >
            <span className="text-[8px]">{isUp ? "▲" : "▼"}</span>
            {toBn(Math.abs(p.change.pct))}%
          </span>
        </div>
      </div>
    </Link>
  );
}

function Section({ title, items, tone }) {
  if (!items.length) return null;

  const color = tone === "up" ? "text-red-500" : "text-green-600";

  return (
    <section className="mb-8">
      <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900 sm:text-lg">
        <span className={`text-xs ${color}`}>{tone === "up" ? "▲" : "▼"}</span>
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <PriceCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

export default function PriceSections() {
  const { data, error, loading } = useFetch(PRODUCTS_API);

  if (loading) {
    return (
      <div className="container mx-auto grid grid-cols-1 gap-3 px-3 py-6 sm:grid-cols-2 sm:px-4 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-2xl bg-gray-100" />
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <p className="container mx-auto px-4 py-6 text-sm text-red-500">
        দাম লোড করা যায়নি
      </p>
    );
  }

  const rising = data
  .filter((p) => p.change.dir === "up")
  .sort((a, b) => b.change.pct - a.change.pct) 
  .slice(0, 6);

const falling = data
  .filter((p) => p.change.dir === "down")
  .sort((a, b) => a.change.pct - b.change.pct) 
  .slice(0, 6);

  return (
    <div className="container mx-auto px-3 py-6 sm:px-4">
      <Section title="আজ দাম বেড়েছে" items={rising} tone="up" />
      <Section title="আজ দাম কমেছে" items={falling} tone="down" />
    </div>
  );
}