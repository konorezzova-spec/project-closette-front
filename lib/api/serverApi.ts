import { cookies } from "next/headers";
import type { FetchGoodsParams } from "./clientApi";
import type { GoodsHttpResponse, Good } from "@/types/good";
import { nextServer } from "./api";
import { CategoriesHttpResponse, CategoriesResponse } from "@/types/category";
import { FeedbacksResponse } from "@/types/feedback";

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

export const fetchPopularGoods = async (): Promise<GoodsHttpResponse> => {
  const { data } = await nextServer.get<GoodsHttpResponse>("/popular");
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
): Promise<CategoriesResponse> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<CategoriesHttpResponse>("/categories", {
    params: { page, perPage },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data.data;
}

export async function fetchFeedbacks(
  params: {
    page?: number;
    perPage?: number;
    productId?: string;
  } = {}
): Promise<FeedbacksResponse> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/feedbacks", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data.data;
}

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.post("/auth/session", null, {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб proxy мав доступ до нових cookie
  return res;
};
