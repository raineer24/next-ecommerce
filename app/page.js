import Image from "next/image";
import { Button } from "@/components/ui/button"
import Hero from "./_components/Hero";
import ProductsList from "./_components/ProductsList";

export default function Home() {
  return (
  <div>
   <Hero />
    
    <div className="p-10 md:px-36 lg:px-48">
      <ProductsList></ProductsList>
    </div>
  </div>
  );
}
