import { cookies } from "next/headers";
import type { CategoriesHttpResponse, FetchGoodsParams } from "./clientApi";
import type { GoodsHttpResponse, Good } from "@/types/good";
import { nextServer } from "./api";

export const fetchGoods = async (
  fetchParams: FetchGoodsParams
): Promise<GoodsHttpResponse> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<GoodsHttpResponse>("/goods", {
    params: fetchParams,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export async function fetchGoodById(id: string): Promise<Good> {
  const cookieStore = await cookies();
  const response = await nextServer.get<Good>(`/goods/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
}

export async function fetchCategories(
  page: number,
  perPage: number
): Promise<CategoriesHttpResponse> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/categories", {
    params: { page, perPage },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data.data;
}
