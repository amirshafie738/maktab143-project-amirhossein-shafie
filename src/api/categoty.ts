import { api } from "@/api/axios";


export type Category = {
  id: number;
  name: string;
};

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>("/category");

  return response.data;
}