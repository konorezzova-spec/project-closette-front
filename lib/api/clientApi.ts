
import type { Good, GoodsHttpResponse } from '@/types/good'
import type { CategoriesResponse } from '@/types/category'
import type { CreateOrderParams, Order } from '@/types/order'

import { nextServer } from './api'

export interface FetchGoodsParams {
  page: number
  perPage: number
  category?: string
  size?: string[]
  gender?: string
  minPrice?: number
  maxPrice?: number
}

export interface Category {
  _id: string
  name: string
  image?: string
}

export interface CategoriesHttpResponse {
  status: number
  message: string
  data: {
    categories: Category[]
    totalItems: number
    page: number
    perPage: number
    totalPages: number
  }
}


export const fetchGoods = async (
  params: FetchGoodsParams
): Promise<GoodsHttpResponse> => {
  const { data } = await nextServer.get<GoodsHttpResponse>('/goods', {
    params,
        paramsSerializer: {
      serialize: (params) => {
        const searchParams = new URLSearchParams()

        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              searchParams.append(key, String(item))
            })
          } else if (value !== undefined && value !== null) {
            searchParams.append(key, String(value))
          }
        })

        return searchParams.toString()
      },
    },
  })

  return data
}


export async function fetchGoodById(id: string): Promise<Good> {
  const response = await nextServer.get<Good>(`/goods/${id}`)
  return response.data
}

export async function fetchCategories(
  page: number,
  perPage: number
): Promise<CategoriesResponse> {
  const { data } = await nextServer.get('/categories', {
    params: { page, perPage },
  })

  return data.data
}

export const createOrder = async (
  params: CreateOrderParams
): Promise<Order> => {
  const response = await nextServer.post<Order>('/orders', params)
  return response.data
}
