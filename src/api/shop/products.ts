import { Product } from "@/types/product";
import { api } from "../axios";
import { ProductsResponse } from "../product";

export type ProductFilters = {
    page?: number;
    limit?: number;
    category?: string;
    brand?: string;
    search?: string;
  };

export async function getFilteredProducts({
  page = 1,
  limit = 9,
  category = "",
  brand = "",
  search = "",
}: ProductFilters = {}): Promise<ProductsResponse> {
  const response = await api.get<Product[]>("/products", {
    params: {
      _page: page,
      _limit: limit,
      ...(category && { category }),
      ...(brand && { brand }),
      ...(search && { q: search }),
    },
  });

  return {
    data: response.data,
    total: Number(response.headers["x-total-count"]),
  };
}