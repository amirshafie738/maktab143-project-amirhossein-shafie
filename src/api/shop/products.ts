import { Product } from "@/types/product";
import { api } from "../axios";
import { ProductsResponse } from "../product";

export type ProductFilters = {
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  inStock?: boolean;
};

export async function getFilteredProducts({
  page = 1,
  limit = 9,
  category = "",
  brand = "",
  search = "",
  minPrice = "",
  maxPrice = "",
  inStock = false,
  sort = "newest",
}: ProductFilters = {}): Promise<ProductsResponse> {
  let sortField = "createdAt";
  let sortOrder = "desc";

  if (sort === "oldest") {
    sortField = "createdAt";
    sortOrder = "asc";
  }

  if (sort === "price-asc") {
    sortField = "price";
    sortOrder = "asc";
  }

  if (sort === "price-desc") {
    sortField = "price";
    sortOrder = "desc";
  }
  const response = await api.get<Product[]>("/products", {
    params: {
      _page: page,
      _limit: limit,

      ...(category && { category }),
      ...(brand && { brand }),
      ...(search && { q: search }),
      ...(minPrice && { price_gte: minPrice }),
      ...(maxPrice && { price_lte: maxPrice }),
      ...(inStock && { quantity_gte: "1" }),
      _sort: sortField,
      _order: sortOrder,
    },
  });

  return {
    data: response.data,
    total: Number(response.headers["x-total-count"]),
  };
}
