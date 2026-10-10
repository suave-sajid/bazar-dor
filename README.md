<div align="center">

# 🛒 বাজার দর | BazarDor

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**
*Daily essential-commodity prices across Bangladesh, at a glance.*

</div>

---

## 📖 About

**BazarDor (বাজার দর)** is a fully Bangla web application that helps people track the daily prices of essential goods such as rice, lentils, oil, vegetables, fish, meat, eggs, milk and spices. Prices are shown market by market across divisions, with daily change indicators, so shoppers can quickly see what got more expensive, what got cheaper, and where to buy.

---

## 🧰 Technologies Used

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| UI Library | [React](https://react.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Authentication | [Better Auth](https://www.better-auth.com/) (Email/Password, Google, GitHub) |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) |
| Marquee | [react-marquee-text](https://www.npmjs.com/package/react-marquee-text) |
| Font | Hind Siliguri (Bangla) via `next/font` |
| Data | REST API (JSON) for categories and products |

---

##  Key Features

1. ** Live Price Overview**
   A home page with a scrolling price ticker, a hero banner with today's date in Bangla, and sections for the **Top 6 price risers ▲** and **Top 6 fallers ▼**, plus a full "সব পণ্য" grid with Bangla digits and change badges.

2. ** Category Browsing & Sorting**
   A scrollable category navbar (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) leads to category pages with sorting by price (low to high / high to low), skeleton loaders, and a friendly empty state.

3. ** Market-wise Product Details**
   Each product page shows the minimum, maximum and average price, plus today's price in each bazar grouped by division, with a visual price-range bar for every market.

4. ** Secure Authentication**
   Email/password sign up and sign in, Google and GitHub social login, protected routes via `proxy.js`, a profile dropdown, and a profile page where users can edit their name and upload a profile photo.

5. ** Responsive & Friendly UX**
   Fully responsive on mobile, tablet and desktop, with toast notifications for login, signup, logout and validation errors, loading skeletons, and a custom 404 page with a "হোম পেজে ফিরে যান" button.

---


##  Note

All prices are indicative and may vary with market conditions.
*সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।*

---

<div align="center">

Made with pgHeroTeam  for Bangladesh 🇧🇩

</div>