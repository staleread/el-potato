import { tempo } from '@staleread/tempo';
import { Order } from '../api/api.types';
import { OrderItem } from './OrderItem';

type OrderListProps = {
  orders: Order[];
  onStatusTriggered: (order: Order) => void;
};

export function OrderList({ orders, onStatusTriggered }: OrderListProps) {
  const imports = [OrderItem];

  const template = `
  <div class="card mt-4">
    <div class="card-body">
      <h4 class="card-title mb-3">Список Замовлень</h4>
      <OrderItem
        :kmap={order in orders by order.id}
        .order={order}
        .onStatusTriggered={onStatusTriggered}
      />
    </div>
  </div>`;

  const attach = {
    orders,
    onStatusTriggered,
  };

  return { imports, template, attach };
}
