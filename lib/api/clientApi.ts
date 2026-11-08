import { Good } from "@/types/good";
import type { CategoriesResponse } from "@/types/category";
import { nextServer } from "./api";

export interface fetchParams {
  page: number;
  perPage: number;
  category?: string;
  size?: string;
  price?: number;
  gender?: string;
}
export interface GoodsHttpResponse {
  data: { goods: Good[] };
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

export const fetchGoods = async (
  fetchParams: fetchParams
): Promise<GoodsHttpResponse> => {
  const { data } = await nextServer.get<GoodsHttpResponse>("/goods", {
    params: fetchParams,
  });

  return data;
};

export async function fetchCategories(
  page: number,
  perPage: number,
): Promise<CategoriesResponse> {
  const { data } = await nextServer.get("/categories", {
    params: { page, perPage },
  });
  return data.data;
}