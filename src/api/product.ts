import { api } from "./axios";
import type { Product } from "@/types/product";

export type GetProductsParams = {
  page?: number;
  limit?: number;
  category?: string;
};

export type ProductsResponse = {
  data: Product[];
  total: number;
};

export type ProductFormData = {
  name: string;
  brand: string;
  category: number;
  subcategory: number;
  description: string;
  price: number;
  quantity: number;
  thumbnail: string;
  image: string[];
};
// گرفتن لیست محصولات
export async function getProducts({
  page = 1,
  limit = 5,
  category = "",
}: GetProductsParams = {}): Promise<ProductsResponse> {
  const response = await api.get<Product[]>("/products", {
    params: {
      _page: page,
      _limit: limit,
      ...(category && { category }),
    },
  });

  return {
    data: response.data,
    total: Number(response.headers["x-total-count"]),
  };
}

// گرفتن یک محصول
export async function getProduct(id: number): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`);

  return response.data;
}

// ساخت محصول
export async function createProduct(data: ProductFormData): Promise<Product> {
  const response = await api.post<Product>("/products", data);

  return response.data;
}

// ویرایش محصول
export async function updateProduct(
  id: number,
  data: ProductFormData
): Promise<Product> {
  const response = await api.put<Product>(`/products/${id}`, data);

  return response.data;
}

// حذف محصول
export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`/products/${id}`);
}

// آپلود تصویر
export async function uploadProductImage(
  file: File
): Promise<{ path: string }> {
  const formData = new FormData();

  formData.append("thumbnail", file);

  const response = await api.post<{ path: string }>("/upload", formData);

  return response.data;
}
// اپلود چند تصویر
export async function uploadProductImages(
  files: File[]
): Promise<{ filename: string; path: string }[]> {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await api.post<{ filename: string; path: string }[]>(
    "/upload-images",
    formData
  );

  return response.data;
}
// مخصوص قیمت ومجودی
export async function updateProductInventory(
  id: number,
  data: {
    price: number;
    quantity: number;
  }
): Promise<Product> {
  const response = await api.patch<Product>(`/products/${id}`, data);

  return response.data;
}

// کم کردن موجودی محصول
export async function decreaseProductQuantity(
  id: number,
  count: number
): Promise<Product> {
  const product = await getProduct(id);

  const newQuantity = Math.max(0, product.quantity - count);

  const response = await api.patch<Product>(`/products/${id}`, {
    quantity: newQuantity,
  });

  return response.data;
}
// جستجوی محصولات
export async function searchProducts(search: string): Promise<Product[]> {
  const response = await api.get<Product[]>("/products", {
    params: {
      _limit: 100,
    },
  });

  const searchText = search.trim().toLowerCase();

  if (!searchText) {
    return response.data.slice(0, 5);
  }

  return response.data
    .filter((product) => {
      const name = product.name.toLowerCase();
      const brand = product.brand.toLowerCase();

      return name.includes(searchText) || brand.includes(searchText);
    })
    .slice(0, 6);
}
