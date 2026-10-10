export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 bg-white">
      <div className="container mx-auto flex flex-col gap-2 px-3 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:text-left">
        <p className="text-sm font-medium text-gray-800">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-xs text-gray-500 sm:max-w-md sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}