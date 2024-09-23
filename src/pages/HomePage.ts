import { tempo } from '@staleread/tempo';
import { ChefPane } from '../components/ChefPane';
import { OrderPane } from '../components/OrderPane';

export function HomePage() {
  const imports = [OrderPane, ChefPane];

  const template = `
  <div class="container mt-5">
    <h1 class="text-center">Піцерія El Potato</h1>
    <OrderPane/>
    <ChefPane/>
  </div>`;

  return { imports, template };
}
