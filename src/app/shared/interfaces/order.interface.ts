export interface Order {
  date?: Date;
  id?: number;
  user_id?: string;
  list: OrderItem[];
}

export interface OrderItem {
  id?: number;
  image?: string;
  name: string;
  price: number;
  quantity: number;
}
