export interface Good {
  _id: string
  name: string
  image: string
  price: {
    value: number
    currency: string
  }
  category: string

  feedbacks: string[]
}

export interface Category {
  _id: string;
  name: string;
  // приклад
}

 export interface Product {
  _id: string
  name: string
  image: string
  category: string
  price: {
    value: number
    currency: string
  }
  feedbacks?: string[]
}

export interface ProductsResponse {
  status: number;
  message: string;
  data: {
    goods: Good[];
    totalItems: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}