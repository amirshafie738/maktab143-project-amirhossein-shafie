import CategoryProducts from "@/components/shop/home/CategoryProducts";
import CategorySection from "@/components/shop/home/CategorySection";
import Hero from "@/components/shop/home/Hero";
import HeroSlider from "@/components/shop/home/HeroSlider";
import Newsletter from "@/components/shop/home/Newsletter";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      
      <CategoryProducts category="3" title="محصولات آرایشی" />

      <HeroSlider />

      <CategoryProducts category="1" title="محصولات مراقبت پوست" />

      <CategorySection />

      <CategoryProducts category="2" title="محصولات مراقبت مو" />

      <CategoryProducts category="4" title="محصولات عطر" />

      <Newsletter/>
    </main>
  );
}
