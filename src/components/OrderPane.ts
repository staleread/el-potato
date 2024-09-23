import { tempo } from '@staleread/tempo';
import { Chef, Order, OrderAddDto } from '../api/api.types';
import { getAllChefs } from '../api/chef-api';
import {
  addOrder,
  getNotReadyOrders,
  getOrder,
  setCooking,
  setReady,
} from '../api/order-api';
import { AddOrderForm } from './AddOrderForm';
import { OrderList } from './OrderList';
import { SelectChefFormModal } from './SelectChefFormModal';
import { Modal } from './ui/Modal';

export function OrderPane() {
  const [addOrderKey, setAddOrderKey] = tempo.useState(0);
  const [orders, setOrders] = tempo.useState<Order[]>([]);
  const [chefs, setChefs] = tempo.useState<Chef[]>([]);
  const [activeOrder, setActiveOrder] = tempo.useState<Order | null>(null);

  tempo.useEffect(() => setChefs([...getAllChefs()]));
  tempo.useEffect(() => setOrders([...getNotReadyOrders()]), []);

  const imports = [AddOrderForm, OrderList, Modal, SelectChefFormModal];

  const template = `
  <div class="container mt-5">
    <AddOrderForm
      :bind={addOrderKey}
      .onValidSubmit={handleOrderAdded}
    />
    <OrderList
      .orders={orders}
      .onStatusTriggered={handleOrderStatusTriggered}
    />
    <SelectChefFormModal
      :bind={selectChefKey}
      .order={activeOrder}
      .chefs={chefs}
      .isOpen={isModalOpen}
      .closeModal={closeModal}
      .onValidSubmit={handleChefIdSubmitted}
    />
  </div>`;

  const attach = {
    addOrderKey,
    orders,
    chefs,
    activeOrder,
    selectChefKey: activeOrder ? 1 : 0,
    isModalOpen: activeOrder !== null,
    closeModal: () => setActiveOrder(null),
    handleOrderAdded: (dto: OrderAddDto) => {
      const id = addOrder(dto);
      const newOrder = getOrder(id);

      setOrders([...orders, newOrder]);
      setAddOrderKey(id);
    },
    handleOrderStatusTriggered: (order: Order) => {
      if (order.status === 'pending') {
        setActiveOrder({ ...order });
        return;
      }
      orders.splice(orders.indexOf(order), 1);

      setReady({ id: order.id });
      setOrders([...orders]);
    },
    handleChefIdSubmitted: (chefId: number) => {
      if (!activeOrder) return;

      setCooking({ id: activeOrder.id, chefId });

      const updatedOrder = getOrder(activeOrder.id);
      orders.splice(orders.indexOf(activeOrder), 1, updatedOrder);

      setOrders([...orders]);
      setActiveOrder(null);
    },
  };

  return { imports, template, attach };
}
