import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-7xl font-extrabold text-green-700">৪০৪</p>
      <h1 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">
        পেজটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="mt-2 max-w-md text-sm text-gray-500">
        আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে, মুছে ফেলা হয়েছে, অথবা
        লিংকটি সঠিক নয়।
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}