
import type { LoginFormData } from "@/schemas/loginSchema";
import { api } from "./axios";

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function login(
  data: LoginFormData
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
}