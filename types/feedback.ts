export type FeedbackProduct = { _id: string; name?: string; title?: string };

export type Feedback = {
  _id?: string;
  id?: string;
  rate: number;
  description: string;
  author?: string;
  productId?: string | FeedbackProduct;
  createdAt?: string;
};

export interface FeedbacksResponse {
  feedbacks: Feedback[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface CreateFeedbackParams {
  author: string;
  description?: string;
  rate: number;
  productId: string;
}
