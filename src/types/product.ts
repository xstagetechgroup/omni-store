// types/product.ts
export interface ProductPlan {
  id: string;
  title: string;
  price: number;
}

export interface TProduct {
  id: number;
  title: string;
  price: number;
  rating: string;
  reviews: string;
  category: string;
  image: string;
  imageSecondary: string;
  about: string;
  description: string;
  plans?: ProductPlan[];
}

export type TPlan = {
    id: string;
    title: string;
    price: number;
};