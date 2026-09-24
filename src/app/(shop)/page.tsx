import CategorySection from "@/components/shop/home/CategorySection";
import Hero from "@/components/shop/home/Hero";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CategorySection />
    </main>
  );
}