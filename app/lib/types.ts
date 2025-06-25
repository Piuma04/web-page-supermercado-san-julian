export type User = {
  id: number;
  email: string;
  passwd: string | null;
  role: string;
};
export type Item = {
  title: string;
  id: string;
  quantity: number;
  unit_price: number;
}

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};