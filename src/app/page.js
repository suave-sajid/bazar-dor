import AllProducts from "@/components/AllProducts";
import Hero from "@/components/Banner";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import PriceSections from "@/components/ProductPrice";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <Navbar></Navbar>
      <Marquee></Marquee>
      <Hero></Hero>
      <PriceSections></PriceSections>
      <AllProducts></AllProducts>
    </div>
  );
}
