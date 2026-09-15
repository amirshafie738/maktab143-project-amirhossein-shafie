import { api } from "./axios";
import type { Product } from "@/types/product";

type GetProductsParams = {
  page?: number;
  limit?: number;
};

type ProductsResponse = {
  data: Product[];
  total: number;
};

export async function getProducts({
  page = 1,
  limit = 5,
}: GetProductsParams = {}): Promise<ProductsResponse> {
  const response = await api.get<Product[]>("/products", {
    params: {
      _page: page,
      _limit: limit,
    },
  });

  return {
    data: response.data,
    total: Number(response.headers["x-total-count"]),
  };
}