export type OrderStatus = 'pending' | 'cooking' | 'ready';

export type Order = {
  id: number;
  title: string;
  client: string;
  birthYear: number;
  status: OrderStatus;
  chefId?: number;
};

export type OrderAddDto = Omit<Order, 'id' | 'status' | 'chefId'>;
export type OrderSetCookingDto = Pick<Order, 'id' | 'chefId'>;
export type OrderSetReadyDto = Pick<Order, 'id'>;

export type Chef = {
  id: number;
  name: string;
  email: string;
};

export type ChefAddDto = Omit<Chef, 'id'>;
