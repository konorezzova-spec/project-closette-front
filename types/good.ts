export interface Good {
  _id: string;
  name: string;
  category: string;
  image: string;
  price: {
    value: number;
    currency: string;
  };
  size: ("XS" | "S" | "M" | "L" | "XL" | "XXL")[];
  description: string;
  feedbacks: string[];
  prevDescription: string;
  characteristics: string[];
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

