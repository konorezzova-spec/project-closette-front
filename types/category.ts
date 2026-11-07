export interface Category {
  _id: string;
  name: string;
  img: string;
}

export interface CategoriesResponse {
  categories: Category[];
  totalItems: number;
  page: number;
  perPage: number;
  totalPages: number;
}