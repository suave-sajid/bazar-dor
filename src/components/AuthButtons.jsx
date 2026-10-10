"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

function Avatar({ user, size = "h-8 w-8" }) {
  if (user.image) {
    return (
      
      <img
        src={user.image}
        alt={user.name}
        referrerPolicy="no-referrer"
        className={`${size} rounded-full object-cover`}
      />
    );
  }
  return (
    <div
      className={`${size} flex items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white`}
    >
      {user.name?.charAt(0).toUpperCase()}
    </div>
  );
}

function UserMenu({ user }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);


  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const logout = async () => {
    setOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("লগআউট হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: () => toast.error("লগআউট ব্যর্থ হয়েছে"),
      },
    });
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition hover:bg-gray-100"
      >
        <Avatar user={user} />
        <span className="hidden text-sm font-medium text-gray-800 sm:block">
          {user.name?.split(" ")[0]}
        </span>
        <span
          className={`text-[10px] text-gray-500 transition ${open ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-100">
          <p className="truncate text-sm font-bold text-gray-900">{user.name}</p>
          <p className="truncate text-xs text-gray-500">{user.email}</p>

          <hr className="my-3 border-gray-100" />

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            <span>👤</span> আমার প্রোফাইল
          </Link>

          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-500 transition hover:bg-red-50"
          >
            <span>↪</span> সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}

export default function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="h-9 w-28 animate-pulse rounded-full bg-gray-200" />;
  }

  if (session) return <UserMenu user={session.user} />;

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/sign-in"
        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
      >
        সাইন ইন
      </Link>
      <Link
        href="/sign-up"
        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
      >
        সাইন আপ
      </Link>
    </div>
  );
}