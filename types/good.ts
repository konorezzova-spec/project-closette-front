export type Size = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Good {
  _id: string;
   category: string;
  name: string;
  image: string;
  price: {
    value: number;
    currency: string;
  };
  
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

export interface GoodReviewValues {
  author: string;
  description: string;
  rate: number;
}

export interface GoodReview {
  _id: string;
  author: string;
  date: string;
  description: string;
  rate: number;
  category: string;
  productId: string;
}
export interface CreateGoodReviewValues extends GoodReviewValues {
  productId: string;
}
