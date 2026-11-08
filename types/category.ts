export interface Category {
  _id: string;
  name: string;
  image: string;
}

export interface CategoriesResponse {
  categories: Category[];
  totalItems: number;
  page: number;
  perPage: number;
  totalPages: number;
}