import { tempo } from '@staleread/tempo';
import { Chef } from '../api/api.types';

type ChefItemProps = {
  chef: Chef;
};

export function ChefItem({ chef }: ChefItemProps) {
  const template = `
  <div class="d-flex justify-content-between py-1">
    <p class="fs-6">{chef.name}</p>
    <p class="fs-6">{chef.email}</p>
  </div>`;

  const attach = {
    chef,
  };

  return { template, attach };
}
