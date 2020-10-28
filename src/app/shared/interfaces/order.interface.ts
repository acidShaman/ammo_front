import {IDishData} from './menu.interface';

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

export interface OrderBackEnd {
  id?: number;
  created?: Date;
  order_items?: Array<OrderItemBackEnd>;
}

export interface OrderItemBackEnd {
  id?: number;
  quantity?: number;
  dish: IDishData;
}
