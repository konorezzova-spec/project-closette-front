import { nextServer } from "./api";
import type { CategoriesResponse } from "@/types/category";

export async function fetchCategories(
  page: number,
  perPage: number,
): Promise<CategoriesResponse> {
  const { data } = await nextServer.get("/categories", {
    params: { page, perPage },
  });
  return data.data;
}