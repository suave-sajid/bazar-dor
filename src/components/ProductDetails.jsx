"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";

// const PRODUCTS_API = "https://api.api-store.workers.dev/api/bazardor/products";
const PRODUCTS_API = "https://openapi.programming-hero.com/api/bazardor/products";

const UNIT_BN = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };
const toBn = (n) => Number(n).toLocaleString("bn-BD");

function StatCard({ label, value, tone }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${tone}`}>
        {toBn(value)}{" "}
        <span className="text-sm font-medium text-gray-500">টাকা</span>
      </p>
    </div>
  );
}

function MarketCard({ m, gMin, gMax }) {
  const range = gMax - gMin || 1;
  const left = ((m.min - gMin) / range) * 100;
  const width = Math.max(((m.max - m.min) / range) * 100, 4);
  const avg = Math.round((m.min + m.max) / 2);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-gray-900">{m.market}</h4>
        <span className="shrink-0 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
          {m.division}
        </span>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-[10px] text-gray-400">সর্বনিম্ন</p>
          <p className="text-sm font-bold text-green-600">{toBn(m.min)} টাকা</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-gray-400">গড়</p>
          <p className="text-sm font-bold text-gray-900">{toBn(avg)} টাকা</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400">সর্বোচ্চ</p>
          <p className="text-sm font-bold text-red-500">{toBn(m.max)} টাকা</p>
        </div>
      </div>

      {/* Range bar: puro bazar er tulonay ei bazar er range */}
      <div className="relative mt-3 h-2 rounded-full bg-gray-100">
        <div
          className="absolute h-2 rounded-full bg-gradient-to-r from-green-400 to-red-400"
          style={{ left: `${left}%`, width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default  function ProductDetailsPage() {
  const { slug } =  useParams();
  const { data, error, loading } = useFetch(PRODUCTS_API);

  if (loading) {
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

  if (error || !data) {
    return <p className="container mx-auto px-4 py-6 text-red-500">ডাটা লোড করা যায়নি</p>;
  }

  const p = data.find((x) => x.slug === slug);

  if (!p) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-gray-600">পণ্যটি পাওয়া যায়নি</p>
        <Link href="/" className="mt-3 inline-block text-green-700 underline">
          হোমে ফিরে যান
        </Link>
      </div>
    );
  }

  // Price summary: sob bazar theke
  const mins = p.markets.map((m) => m.min);
  const maxs = p.markets.map((m) => m.max);
  const gMin = Math.min(...mins);
  const gMax = Math.max(...maxs);
  const avg = Math.round(
    p.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / p.markets.length
  );

  // Division onujayi group
  const groups = p.markets.reduce((acc, m) => {
    (acc[m.division] ||= []).push(m);
    return acc;
  }, {});

  const unit = UNIT_BN[p.unit] ?? p.unit;
  const isUp = p.change.dir === "up";

  return (
    <main className="container mx-auto px-3 py-6 sm:px-4">
      <Link href="/" className="text-xs text-gray-500 hover:text-green-700">
        ← সব পণ্য
      </Link>

      {/* Top summary */}
      <section className="mt-3 rounded-3xl bg-gradient-to-br from-green-50 to-white p-5 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white text-5xl shadow-sm">
            {p.image}
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              {p.nameBn}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              আজ {toBn(p.markets.length)}টি বাজারে {p.nameBn}-এর দাম{" "}
              {toBn(gMin)}–{toBn(gMax)} টাকা। গতকালের তুলনায়{" "}
              <span className={isUp ? "text-red-500" : "text-green-600"}>
                {isUp ? "▲" : "▼"} {toBn(Math.abs(p.change.pct))}%
              </span>
              ।
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
                {p.categoryIcon} {p.categoryNameBn}
              </span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                প্রতি {unit}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="সর্বনিম্ন দাম" value={gMin} tone="text-green-600" />
        <StatCard label="সর্বোচ্চ দাম" value={gMax} tone="text-red-500" />
        <StatCard label="গড় দাম" value={avg} tone="text-gray-900" />
      </section>

      {/* Market wise */}
      <section className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {Object.entries(groups).map(([division, markets]) => (
          <div key={division} className="mb-6">
            <h3 className="mb-2 text-sm font-semibold text-gray-700">
              📍 {division}
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {markets.map((m) => (
                <MarketCard key={m.market} m={m} gMin={gMin} gMax={gMax} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}