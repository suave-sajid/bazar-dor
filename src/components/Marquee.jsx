"use client";
import MarqueeText from "react-marquee-text";
import useFetch from "@/hooks/useFetch";

const PRODUCTS_API = "https://api.api-store.workers.dev/api/bazardor/products";

const UNIT_BN = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };
const toBn = (n) => Number(n).toLocaleString("bn-BD");

function Item({ p }) {
  const isUp = p.change.dir === "up";

  return (
    <span className="mx-5 inline-flex items-center gap-2 text-sm">
      <span className="text-base">{p.image}</span>
      <span className="font-medium text-gray-800">{p.nameBn}</span>
      <span className="text-gray-600">
        {toBn(p.today)} টাকা/{UNIT_BN[p.unit] ?? p.unit}
      </span>
      <span
        className={`inline-flex items-center gap-0.5 font-semibold ${
          isUp ? "text-red-500" : "text-green-600"
        }`}
      >
        <span className="text-[10px]">{isUp ? "▲" : "▼"}</span>
        {toBn(Math.abs(p.change.pct))}%
      </span>
    </span>
  );
}

export default function PriceMarquee() {
  const { data, error, loading } = useFetch(PRODUCTS_API);

  if (error) return null;
  if (loading || !data?.length) {
    return <div className="h-9 animate-pulse border-b bg-gray-100" />;
  }

  return (
    <div className="border-b border-gray-200 bg-white py-2">
      <MarqueeText duration={10} pauseOnHover direction="right">
        {data.map((p) => (
          <Item key={p.id} p={p} />
        ))}
      </MarqueeText>
    </div>
  );
}