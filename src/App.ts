import tempo from '@staleread/tempo';
import { AddOrderForm } from './components/AddOrderForm';
import { AddChefForm } from './components/AddChefForm';
import { OrderAddDto, ChefAddDto } from './dto.types';

export function App() {
  const [orderId, setOrderId] = tempo.useState(1);
  const [chefId, setChefId] = tempo.useState(1);

  const imports = [AddOrderForm, AddChefForm];

  const template = `
  <div class="container mt-5">
    <h1 class="text-center">Піцерія El Potato</h1>
    <AddOrderForm .onValidSubmit={handleOrderAdded} $bind {orderId}/>
    <AddChefForm .onValidSubmit={handleChefAdded} $bind {chefId}/>
  </div>`;

  const attach = {
    orderId,
    chefId,
    handleOrderAdded: (dto: OrderAddDto) => {
      console.log(dto);
      setOrderId(orderId + 1);
    },
    handleChefAdded: (dto: ChefAddDto) => {
      console.log(dto);
      setChefId(chefId + 1);
    },
  };

  return { imports, template, attach };
}
