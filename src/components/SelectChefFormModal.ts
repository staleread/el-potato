import { tempo } from '@staleread/tempo';
import { Chef, Order } from '../api/api.types';
import { useInput } from '../hooks/use-input';
import { validateIntId } from '../validation/validation-rules';
import { Input } from './ui/Input';
import { Modal } from './ui/Modal';
import { Select } from './ui/Select';

type SelectChefFormModalProps = {
  order: Order;
  chefs: Chef[];
  isOpen: boolean;
  closeModal: () => void;
  onValidSubmit: (chefId: number) => void;
};

export function SelectChefFormModal(props: SelectChefFormModalProps) {
  const chef = useInput('', (input: string) => validateIntId(input));

  const imports = [Modal, Input, Select];

  const template = `
  <Modal .isOpen={props.isOpen} .close={props.closeModal}>
    <form @submit={handleSubmit}>
      <div class="modal-header">
        <h5 class="modal-title">Оберіть шефа для виконання замовлення</h5>
      </div>

      <div class="modal-body">
        <Input
          .id="order-title"
          .type="text"
          .label="Назва страви"
          .isReadonly={true}
          .value={props.order.title}
        />
        <Select
          .id="chef-id"
          .placeholder="Оберіть шефа"
          .label="Відповідальний шеф"
          .options={chefOptions}
          *={chef}
        />
      </div>

      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          @click={props.closeModal}
        >
          Скасувати
        </button>

        <button type="submit" class="btn btn-primary">
          Відправити
        </button>
      </div>
    </form>
  </Modal>`;

  const attach = {
    props,
    chef,
    chefOptions: props.chefs.map((chef: Chef) => ({
      value: chef.id.toString(),
      displayValue: chef.name,
    })),
    handleSubmit: (e: Event) => {
      e.preventDefault();

      const id = parseInt(chef.value);
      props.onValidSubmit(id);
    },
  };

  return { imports, template, attach };
}
