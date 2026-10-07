"use client"

import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";

export default function Navbar() {
  const CATAGORIES_API = "https://api.api-store.workers.dev/api/bazardor/categories"
  const {data, error, loading} = useFetch(CATAGORIES_API)

  console.log(data)
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const formatted = new Date().toLocaleDateString("bn-BD", {
      timeZone: "Asia/Dhaka",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setLocalTime(formatted);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between  px-4 py-2">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3">
          <img src="/logo-icon.png" alt="Logo" className="h-8 w-8 object-contain " />
          <div className="leading-tight">
            <h1 className="text-lg font-bold text-gray-900">বাজার দর</h1>
            <p className="text-xs text-gray-500">{localTime}</p>
          </div>
        </div>

        {/* Right: Auth buttons */}
        <div className="flex items-center gap-3">
          <button className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
            সাইন ইন
          </button>
          <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700">
            সাইন আপ
          </button>
        </div>
      </div>
    </nav>
  );
}