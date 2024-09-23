import { tempo } from '@staleread/tempo';
import { Chef } from '../api/api.types';
import { ChefItem } from './ChefItem';

type ChefListProps = {
  chefs: Chef[];
};

export function ChefList({ chefs }: ChefListProps) {
  const imports = [ChefItem];

  const template = `
  <div class="card mt-4">
    <div class="card-body">
      <h4 class="card-title mb-3">Список Шефів</h4>
      <ChefItem
        :kmap={chef in chefs by chef.id}
        .chef={chef}
      />
    </div>
  </div>`;

  const attach = {
    chefs,
  };

  return { imports, template, attach };
}
