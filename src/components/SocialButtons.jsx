"use client";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "sonner";

export default function SocialButtons() {
  const social = async (provider) => {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
      errorCallbackURL: "/signin",
    });
    if (error) toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
  };

  const btn =
    "flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50";

  return (
    <div className="space-y-2">
      <button type="button" onClick={() => social("google")} className={btn}>
        <span className="font-bold text-red-500">G</span> Google দিয়ে চালিয়ে যান
      </button>
      
    </div>
  );
}