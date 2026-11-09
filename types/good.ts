export type Size = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Good {
  _id: string;
  name: string;
  category: string;
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

export interface Category {
  _id: string;
  name: string;
  // приклад
}
