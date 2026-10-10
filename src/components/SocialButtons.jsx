"use client";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SocialButtons() {
  const social = async (provider) => {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
      errorCallbackURL: "/sign-in",
    });
    if (error) toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
  };



  useEffect(() => {
    const err = new URLSearchParams(window.location.search).get("error");
    if (!err) return;

    const messages = {
      account_not_linked: "এই ইমেইল দিয়ে আগে অন্য পদ্ধতিতে অ্যাকাউন্ট খোলা হয়েছে",
      access_denied: "লগইন বাতিল করা হয়েছে",
    };
    toast.error(messages[err] || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
  }, []);

  const btn =
    "flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50";

  return (
    <div className="space-y-2">
      <button type="button" onClick={() => social("google")} className={btn}>
        <span className="font-bold text-red-500">G</span> Google দিয়ে চালিয়ে যান
      </button>
      <button type="button" onClick={() => social("github")} className={btn}>
        <span className="font-bold text-green-500">G</span> Github দিয়ে চালিয়ে যান
      </button>

    </div>
  );
}