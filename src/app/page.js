import AllProducts from "@/components/AllProducts";
import Hero from "@/components/Banner";
import PriceSections from "@/components/ProductPrice";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <PriceSections></PriceSections>
      <AllProducts></AllProducts>
    </div>
  );
}
