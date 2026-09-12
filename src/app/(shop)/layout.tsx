import Footer from "@/components/shop/layout/Footer";
import Header from "@/components/shop/layout/Heder";

export default function ShopLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen bg-slate-50">
           <Header/>
        {children}
        <Footer/>
      </div>
    );
  }