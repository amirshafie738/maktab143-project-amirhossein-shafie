import { notFound } from "next/navigation";
import { getProduct } from "@/api/product";
import ProductCart from "@/components/shop/prodduct/ProductCart";
import ProductDetails from "@/components/shop/prodduct/ProductDetails";



type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const productId = Number(id);

  if (Number.isNaN(productId)) {
    notFound();
  }

  try {
    const product = await getProduct(productId);

    return (
      <>
        <ProductCart  product={product} />

        <ProductDetails product={product} />
      </>
    );
  } catch {
    notFound();
  }
}
