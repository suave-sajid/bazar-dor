import Link from "next/link";

const UNIT_BN = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };

const toBn = (n) => Number(n).toLocaleString("bn-BD");
const pctBn = (n) =>
  Math.abs(Number(n)).toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

const BADGE = {
  up: { cls: "bg-red-50 text-red-500", icon: "▲" },
  down: { cls: "bg-green-50 text-green-600", icon: "▼" },
  flat: { cls: "bg-gray-100 text-gray-500", icon: "—" },
};

export default function PriceCard({ p }) {
  const dir = p.change.pct === 0 ? "flat" : p.change.dir;
  const badge = BADGE[dir] ?? BADGE.flat;

  return (
    <Link
      href={`/products/${p.slug}`}
      className="block rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md sm:p-4"
    >
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

      <div className="mt-3">
        <p className="text-[10px] text-gray-400">আজকের দাম</p>
        <div className="flex items-end justify-between gap-2">
          <p className="text-base font-bold text-gray-900 sm:text-lg">
            {toBn(p.today)}{" "}
            <span className="text-xs font-medium text-gray-600">টাকা</span>
          </p>
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${badge.cls}`}
          >
            <span className="text-[8px]">{badge.icon}</span>
            {pctBn(p.change.pct)}%
          </span>
        </div>
      </div>
    </Link>
  );
}