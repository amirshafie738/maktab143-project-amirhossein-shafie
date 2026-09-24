import { api } from "@/api/axios";
import { Product } from "@/types/product";


export async function getBrands(): Promise<string[]> {
    const response = await api.get<Product[]>("/products");
  
    const brands = response.data.map((product) => product.brand);
  
    return [...new Set(brands)];
  }