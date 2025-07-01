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