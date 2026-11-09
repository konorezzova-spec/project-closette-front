export type Size = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Good {
  _id: string;
  name: string;
  image: string;
  price: {
    value: number;
    currency: string;
  };
  feedbacks?: string[];
  size: Size[];
  description: string;
  feedbacks: string[];
  prevDescription: string;
  characteristics: string[];
}

export interface GoodsResponse {
  goods: Good[];
  totalItems: number;
  page: number;
  totalPages: number;
}

export interface GoodsHttpResponse {
  status: number;
  message: string;
  data: GoodsResponse;
}