import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="h-screen">
        <Image
          height={700}
          width={1200}
          src="https://cdn.sanity.io/images/ztm1moqx/production/44857bcb4e03a2793f4879255d64f451c37ee773-3840x2560.jpg?w=1920&q=75&fit=clip&auto=format"
          alt="hero-background"
          className="h-full w-screen object-cover absolute left-0 top-0 z-10"
        />
        <div className="absolute h-full w-full top-0 left-0 bg-gradient-to-b from-[#00000010] to-[#00000020] z-10"></div>
        <Hero />
      </div>
      <ProductList />
    </main>
  );
}
