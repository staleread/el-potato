import {
  Order,
  OrderAddDto,
  OrderSetCookingDto,
  OrderSetReadyDto,
} from '../api/api.types';
import { Storage } from '../dal/storage';

export class OrderService {
  constructor(private readonly storage: Storage<Order>) {}

  public get(id: number): Order {
    const order = this.storage.get(id);

    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  public getNotReadyOrders() {
    return this.storage.getAll().filter((o: Order) => o.status !== 'ready');
  }

  public add(dto: OrderAddDto): number {
    // server validation should be here...

    const id = this.storage.getNextId();

    const order: Order = {
      id,
      title: dto.title,
      client: dto.client,
      birthYear: dto.birthYear,
      status: 'pending',
    };

    this.storage.add(order);
    this.storage.saveChanges();

    return id;
  }

  public setCooking(dto: OrderSetCookingDto): void {
    const order = this.storage.get(dto.id);

    if (!order) {
      throw new Error('Order not found');
    }

    // server validation should be here...

    order.status = 'cooking';
    order.chefId = dto.chefId;

    this.storage.saveChanges();
  }

  public setReady(dto: OrderSetReadyDto): void {
    const order = this.storage.get(dto.id);

    if (!order) {
      throw new Error('Order not found');
    }

    // server validation should be here...

    order.status = 'ready';

    this.storage.saveChanges();
  }
}
