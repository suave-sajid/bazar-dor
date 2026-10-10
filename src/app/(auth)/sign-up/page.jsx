"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    setError("");
    const form = new FormData(e.currentTarget);
    const { name, email, password } = Object.fromEntries(form.entries());

    


    // validation
    let msg = "";
    if (!name || !email || !password) msg = "সব ঘর পূরণ করুন";
    else if (password.length < 8) msg = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
    if (msg) {
      setError(msg);
      return toast.error(msg);
    }

    setLoading(true);
    const { data, error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);



    if (error) {
      const m = error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে";
      setError(m);
      return toast.error(m);
    }

    toast.success("রেজিস্ট্রেশন সফল! এখন লগইন করুন");
    router.push("/sign-in");
    formEl.reset();
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
        <h1 className="text-2xl font-extrabold text-gray-900">রেজিস্ট্রেশন</h1>
        <p className="mt-1 text-sm text-gray-500">নতুন অ্যাকাউন্ট তৈরি করুন</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <input
            name="name"
            type="text"
            placeholder="নাম"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-600"
          />
          <input
            name="email"
            type="email"
            placeholder="ইমেইল"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-600"
          />
          <input
            name="password"
            type="password"
            placeholder="পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-600"
          />

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? "রেজিস্টার হচ্ছে..." : "রেজিস্টার"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-xs text-gray-400">
          <span className="h-px flex-1 bg-gray-200" />
          অথবা
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <SocialButtons />

        <p className="mt-5 text-center text-sm text-gray-600">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/sign-in" className="font-semibold text-green-700 hover:underline">
            লগইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}