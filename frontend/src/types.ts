export type Category = {
  id: string;
  name: string;
}

export type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  banner: string;
  created_at: string;
  updated_at: string;
  category_id: string;
}

export type Order = {
  id: string;
  table: number;
  status: boolean;
  draft: boolean;
  name: string;
  created_at: string;
  updated_at: string;
}

export type OrderDetail = {
  id: string;
  amount: number;
  created_at: string;
  updated_at: string;
  product_id: string;
  product: Product;
  order: Order;
}