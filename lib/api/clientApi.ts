import type { ProductsResponse } from "@/types/good";
import { nextServer } from "./api";


export async function getPopularProducts(): Promise<ProductsResponse> {
  const { data } = await nextServer.get<ProductsResponse>("/goods");

  return data;
}