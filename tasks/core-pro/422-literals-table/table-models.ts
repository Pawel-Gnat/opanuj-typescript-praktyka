export type Entities = {
  user: User;
  product: Product;
  order: Order;
};

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  productId: number;
  quantity: number;
}
