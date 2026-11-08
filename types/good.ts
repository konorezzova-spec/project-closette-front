export interface Good {
  _id: string;
  name: string;
  image: string;
  price: {
    value: number;
    currency: string;
  };
  feedbacks?: string[];
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