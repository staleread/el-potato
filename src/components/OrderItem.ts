import { tempo } from '@staleread/tempo';
import { Order, OrderStatus } from '../api/api.types';
import { Button } from './ui/Button';
import { ButtonStyle } from './ui/ui.types';

type OrderItemProps = {
  order: Order;
  onStatusTriggered: (order: Order) => void;
};

const buttonStyles: Record<OrderStatus, ButtonStyle> = {
  pending: 'secondary',
  cooking: 'warning',
  ready: 'info',
};

const buttonTexts: Record<OrderStatus, string> = {
  pending: 'Нове',
  cooking: 'Готується',
  ready: 'Готово',
};

export function OrderItem({ order, onStatusTriggered }: OrderItemProps) {
  const imports = [Button];

  const template = `
  <div class="d-flex justify-content-between align-items-center py-1">
    <p class="m-0">{order.title}</p>
    <Button .style="{buttonStyle}" .onClick={handleClick}>
      {buttonText}
    </Button>
  </div>`;

  const attach = {
    order,
    buttonStyle: buttonStyles[order.status],
    buttonText: buttonTexts[order.status],
    handleClick: () => onStatusTriggered(order),
  };

  return { imports, template, attach };
}
