import type { Good } from "@/types/good";
import { Good } from "@/types/good";
import type { CategoriesResponse } from "@/types/category";
import { nextServer } from "./api";

export interface FetchParams {
  page: number;
  perPage: number;
  category?: string;
  size?: string;
  price?: number;
  gender?: string;
}

// 🟩 Структура відповіді API
export interface GoodsHttpResponse {
  status: number;
  message: string;
  data: {
    goods: Good[];
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
  };
}

// 🟩 Запит товарів
export const fetchGoods = async (
  fetchParams: FetchParams
): Promise<GoodsHttpResponse> => {
  const { data } = await nextServer.get<GoodsHttpResponse>("/goods", {
    params: fetchParams,
  });

  return data;
};
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
