export type Feedback = {
  _id?: string;
  id?: string;
  rating: number;
  comment: string;
  author?: string;
  name?: string;
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