const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export function getImageUrl(image?: string | null) {
  if (!image) return "";

  if (image.startsWith("/files/")) {
    return `${API_BASE_URL}${image}`;
  }

  return image;
}