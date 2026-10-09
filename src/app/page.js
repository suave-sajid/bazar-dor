import Hero from "@/components/Banner";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <Navbar></Navbar>
      <Marquee></Marquee>
      <Hero></Hero>
    </div>
  );
}
