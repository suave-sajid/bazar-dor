"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";



export default function Hero() {

    const [today, setToday] = useState("");

    useEffect(() => {
        setToday(
            new Date().toLocaleDateString("bn-BD", {
                timeZone: "Asia/Dhaka",
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            })
        );
    }, []);


    return (
        <section className="container mx-auto px-3 py-4 sm:px-4 sm:py-6">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 to-white px-5 py-6 shadow-sm sm:px-8 sm:py-8 md:px-12 md:py-10">
                <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between">
                    {/* Left: text */}
                    <div className="max-w-xl text-center md:text-left">
                        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-[11px] font-medium text-green-700 sm:text-xs">
                            {today}
                        </span>

                        <h1 className="mt-3 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                            আজকের বাজারের দাম এক নজরে
                        </h1>

                        <p className="mt-3 text-xs leading-relaxed text-gray-500 sm:text-sm">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক
                            জায়গায়।
                        </p>

                        <a
                            href="#all-products"
                            className="mt-5 inline-block rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-green-800"
                        >
                            সব দাম দেখুন
                        </a>
                    </div>

                    {/* Right: illustration */}
                    <div className="shrink-0">
                        <Image
                            src="/bazar-hero.png"
                            alt="সবজি ও ফলের ঝুড়ি"
                            width={260}
                            height={200}
                            priority
                            className="h-auto w-40 sm:w-52 md:w-64"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}