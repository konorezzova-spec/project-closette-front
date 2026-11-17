import type { Good, GoodsHttpResponse } from "@/types/good";
import type { CategoriesResponse } from "@/types/category";
import type {
  CreateOrderParams,
  Order,
  OrderStatus,
  AdminOrdersResponse,
} from "@/types/order";
import type {
  Feedback,
  FeedbacksResponse,
  CreateFeedbackParams,
} from "@/types/feedback";

import { nextServer } from "./api";

export interface FetchGoodsParams {
  page: number;
  perPage: number;
  category?: string;
  size?: string[];
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const fetchGoods = async (
  params: FetchGoodsParams
): Promise<GoodsHttpResponse> => {
  const { data } = await nextServer.get<GoodsHttpResponse>("/goods", {
    params,
    paramsSerializer: {
      serialize: params => {
        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(item => {
              searchParams.append(key, String(item));
            });
          } else if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
          }
        });

        return searchParams.toString();
      },
    },
  });

  return data;
};

export const fetchPopularGoods = async (): Promise<GoodsHttpResponse> => {
  const { data } = await nextServer.get<GoodsHttpResponse>("/popular");
  return data;
};

export async function fetchGoodById(id: string): Promise<Good> {
  const response = await nextServer.get<Good>(`/goods/${id}`);
  return response.data;
}

export async function fetchCategories(
  page: number,
  perPage: number
): Promise<CategoriesResponse> {
  const { data } = await nextServer.get("/categories", {
    params: { page, perPage },
  });

  return data.data;
}

export const createOrder = async (
  params: CreateOrderParams
): Promise<Order> => {
  const response = await nextServer.post<Order>("/orders", params);
  return response.data;
};

export const fetchFeedbacks = async (
  productId: string,
  page = 1,
  perPage = 20
): Promise<FeedbacksResponse> => {
  const { data } = await nextServer.get<{ data: FeedbacksResponse }>(
    "/feedbacks",
    { params: { productId, page, perPage } }
  );
  return data.data;
};

export const createFeedback = async (
  params: CreateFeedbackParams
): Promise<Feedback> => {
  const { data } = await nextServer.post<{ data: Feedback }>(
    "/feedbacks",
    params
  );
  return data.data;
};

export interface FetchAllOrdersParams {
  page?: number;
  perPage?: number;
  status?: OrderStatus;
}

export const fetchAllOrders = async (
  params: FetchAllOrdersParams = {}
): Promise<AdminOrdersResponse> => {
  const { data } = await nextServer.get<{ data: AdminOrdersResponse }>(
    "/orders/admin",
    { params }
  );
  return data.data;
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus
): Promise<Order> => {
  const { data } = await nextServer.patch<Order>(`/orders/${orderId}`, {
    status,
  });
  return data;
};
