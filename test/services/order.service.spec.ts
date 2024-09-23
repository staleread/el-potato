import {
  Order,
  OrderAddDto,
  OrderSetCookingDto,
  OrderSetReadyDto,
} from '../../src/api/api.types';
import { Storage } from '../../src/dal/storage';
import { OrderService } from '../../src/services/order.service';

describe('OrderService', () => {
  let orderService: OrderService;

  const mockStorage = {
    get: (_id: number): Order | undefined => undefined,
    getAll: (): Order[] => [],
    add: (_item: Order) => {},
    saveChanges: () => {},
    getNextId: () => 1,
  };

  beforeEach(() => {
    orderService = new OrderService(mockStorage as Storage<Order>);
  });

  it('should return order by ID', () => {
    const order: Order = {
      id: 1,
      title: 'Pizza',
      client: 'John Doe',
      birthYear: 1990,
      status: 'pending',
    };

    jest.spyOn(mockStorage, 'get').mockImplementation((_: number) => order);

    const result = orderService.get(1);

    expect(result).toEqual(order);
  });

  it('should throw error if order is not found', () => {
    jest.spyOn(mockStorage, 'get').mockImplementation(() => undefined);

    expect(() => orderService.get(14)).toThrow('Order not found');
  });

  it('should return orders that are not ready', () => {
    const orders: Order[] = [
      {
        id: 1,
        title: 'Pizza',
        client: 'John Doe',
        birthYear: 1990,
        status: 'pending',
      },
      {
        id: 2,
        title: 'Pasta',
        client: 'Jane Doe',
        birthYear: 1995,
        status: 'ready',
      },
    ];

    jest.spyOn(mockStorage, 'getAll').mockImplementation(() => orders);

    const result = orderService.getNotReadyOrders();

    expect(result).toEqual([orders[0]]);
  });

  it('should add a new order', () => {
    const dto: OrderAddDto = {
      title: 'Pizza',
      client: 'John Doe',
      birthYear: 1990,
    };

    jest.spyOn(mockStorage, 'getNextId').mockReturnValue(1);

    const addSpy = jest
      .spyOn(mockStorage, 'add')
      .mockImplementation(() => {});

    const saveChangesSpy = jest
      .spyOn(mockStorage, 'saveChanges')
      .mockImplementation(() => {});

    const id = orderService.add(dto);

    expect(id).toBe(1);
    expect(addSpy).toHaveBeenCalledWith({
      id: 1,
      title: 'Pizza',
      client: 'John Doe',
      birthYear: 1990,
      status: 'pending',
    });
    expect(saveChangesSpy).toHaveBeenCalled();
  });

  it('should set order status to cooking', () => {
    const order: Order = {
      id: 1,
      title: 'Pizza',
      client: 'John Doe',
      birthYear: 1990,
      status: 'pending',
    };

    jest.spyOn(mockStorage, 'get').mockImplementation(() => order);

    const saveChangesSpy = jest
      .spyOn(mockStorage, 'saveChanges')
      .mockImplementation(() => {});

    const dto: OrderSetCookingDto = {
      id: 1,
      chefId: 2,
    };

    orderService.setCooking(dto);

    expect(order.status).toBe('cooking');
    expect(order.chefId).toBe(2);
    expect(saveChangesSpy).toHaveBeenCalled();
  });

  it('should set order status to ready', () => {
    const order: Order = {
      id: 1,
      title: 'Pizza',
      client: 'John Doe',
      birthYear: 1990,
      status: 'cooking',
    };

    jest.spyOn(mockStorage, 'get').mockImplementation(() => order);

    const saveChangesSpy = jest
      .spyOn(mockStorage, 'saveChanges')
      .mockImplementation(() => {});

    const dto: OrderSetReadyDto = {
      id: 1,
    };

    orderService.setReady(dto);

    expect(order.status).toBe('ready');
    expect(saveChangesSpy).toHaveBeenCalled();
  });
});
