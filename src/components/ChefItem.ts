import { tempo } from '@staleread/tempo';
import { Chef } from '../api/api.types';

type ChefItemProps = {
  chef: Chef;
};

export function ChefItem({ chef }: ChefItemProps) {
  const template = `
  <div class="d-flex justify-content-between align-items-center py-1">
    <p class="m-0">{chef.name}</p>
    <p class="m-0">{chef.email}</p>
  </div>`;

  const attach = {
    chef,
  };

  return { template, attach };
}
