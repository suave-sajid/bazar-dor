"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

// Chhobi ke 256x256 square e crop + compress kore base64 banay
function resizeImage(file, size = 256) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;

      // majhkhan theke square crop
      const min = Math.min(img.width, img.height);
      const sx = (img.width - min) / 2;
      const sy = (img.height - min) / 2;

      canvas.getContext("2d").drawImage(img, sx, sy, min, min, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("invalid image"));
    };
    img.src = url;
  });
}

function Avatar({ user, uploading, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={uploading}
      title="ছবি পরিবর্তন করুন"
      className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100"
    >
      {user.image ? (
        <img
          src={user.image}
          alt={user.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-green-600 text-2xl font-bold text-white">
          {user.name?.charAt(0).toUpperCase()}
        </span>
      )}

      {/* hover / uploading overlay */}
      <span
        className={`absolute inset-0 flex items-center justify-center bg-black/50 text-[10px] font-medium text-white transition ${
          uploading ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {uploading ? "আপলোড..." : "📷 পরিবর্তন"}
      </span>
    </button>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const fileRef = useRef(null);
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // session ashle input e nam boshao
  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session?.user?.name]);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("লগআউট হয়েছে");
          router.push("/sign-in");
          router.refresh();
        },
        onError: () => toast.error("লগআউট ব্যর্থ হয়েছে"),
      },
    });
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (trimmed.length < 2) return toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
    if (trimmed === session.user.name) return toast("কোনো পরিবর্তন নেই");

    setSaving(true);
    const { error } = await authClient.updateUser({ name: trimmed });
    setSaving(false);

    if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
    toast.success("নাম আপডেট হয়েছে");
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // same file abar select korle onChange jate cholte pare
    if (!file) return;

    if (!file.type.startsWith("image/")) return toast.error("শুধু ছবি দিন");
    if (file.size > 5 * 1024 * 1024) return toast.error("ছবি ৫MB এর কম হতে হবে");

    setUploading(true);
    try {
      const image = await resizeImage(file);
      const { error } = await authClient.updateUser({ image });
      if (error) throw new Error(error.message);
      toast.success("প্রোফাইল ছবি আপডেট হয়েছে");
    } catch (err) {
      toast.error(err.message || "ছবি আপলোড ব্যর্থ হয়েছে");
    } finally {
      setUploading(false);
    }
  };

  if (isPending) {
    return (
      <div className="container mx-auto max-w-3xl space-y-4 px-3 py-8 sm:px-4">
        <div className="h-8 w-40 animate-pulse rounded bg-gray-100" />
        <div className="h-24 animate-pulse rounded-2xl bg-gray-100" />
        <div className="h-44 animate-pulse rounded-2xl bg-gray-100" />
      </div>
    );
  }

  if (!session) return null; // proxy.js already /signin e pathay

  const { user } = session;

  return (
    <main className="container mx-auto max-w-3xl px-3 py-8 sm:px-4">
      <h1 className="text-2xl font-extrabold text-gray-900">আমার প্রোফাইল</h1>
      <p className="mb-5 text-xs text-gray-500">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      {/* Card 1: avatar + info + sign out */}
      <section className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-5">
        <Avatar
          user={user}
          uploading={uploading}
          onClick={() => fileRef.current?.click()}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold text-gray-900">
            {user.name}
          </h2>
          <p className="truncate text-sm text-gray-500">{user.email}</p>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="mt-1 text-xs font-medium text-green-700 hover:underline disabled:opacity-50"
          >
            ছবি পরিবর্তন করুন
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="shrink-0 rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50 sm:text-sm"
        >
          ↪ সাইন আউট
        </button>
      </section>

      {/* Card 2: edit name */}
      <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-5">
        <h3 className="text-sm font-bold text-gray-900">তথ্য</h3>

        <form onSubmit={handleUpdateName} className="mt-4 space-y-3">
          <div>
            <label htmlFor="name" className="mb-1 block text-xs text-gray-600">
              নাম
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-600"
            />
          </div>

          

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
          >
            {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </section>
    </main>
  );
}