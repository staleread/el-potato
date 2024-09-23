import { Storage } from '../dal/storage';
import { OrderService } from '../services/order-service';
import {
  Order,
  OrderAddDto,
  OrderSetCookingDto,
  OrderSetReadyDto,
} from './api.types';

// ideally that should be a bunch of async api calls to server
const orderStorage = new Storage<Order>('Orders');
const orderService = new OrderService(orderStorage);

export const getOrder = (id: number): Order => orderService.get(id);

export const getNotReadyOrders = () => orderService.getNotReadyOrders();

export const addOrder = (dto: OrderAddDto): number => orderService.add(dto);

export const setCooking = (dto: OrderSetCookingDto) =>
  orderService.setCooking(dto);

export const setReady = (dto: OrderSetReadyDto) =>
  orderService.setReady(dto);
