"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    setError("");
    const form = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(form.entries());

    // validation
    if (!email || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দিন";
      setError(msg);
      return toast.error(msg);
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const msg = error.message || "লগইন ব্যর্থ হয়েছে";
      setError(msg);
      return toast.error(msg);
    }

    toast.success("সফলভাবে লগইন হয়েছে");
    window.location.href = "/";
    formEl.reset();

  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
        <h1 className="text-2xl font-extrabold text-gray-900">লগইন করুন</h1>
        <p className="mt-1 text-sm text-gray-500">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <input
            name="email"
            type="email"
            placeholder="ইমেইল"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-600"
          />
          <input
            name="password"
            type="password"
            placeholder="পাসওয়ার্ড"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-600"
          />

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? "লগইন হচ্ছে..." : "লগইন"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-xs text-gray-400">
          <span className="h-px flex-1 bg-gray-200" />
          অথবা
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <SocialButtons />

        <p className="mt-5 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/sign-up" className="font-semibold text-green-700 hover:underline">
            রেজিস্টার করুন
          </Link>
        </p>
      </div>
    </main>
  );
}