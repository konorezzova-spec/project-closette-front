export type GoodPrice = {
  value: number;
  currency: string;
};

export interface Good {
  _id: string;
  name: string;
  category: string;
  image: string;
  price: GoodPrice;
  size: string[];
  description: string;
  feedbacks: string[];
  prevDescription: string;
  gender: string;
  characteristics: string[];
}

export interface Category {
  _id: string;
  name: string;
  // приклад
}
