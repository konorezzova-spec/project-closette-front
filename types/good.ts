export interface Good {
  _id: string;
  title: string;
  category: string;
  // Приклад
}

export interface Category {
  _id: string;
  name: string;
  // приклад
}

 export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
   reviewsCount: number;
   
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}