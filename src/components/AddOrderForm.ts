import tempo from '@staleread/tempo';
import { InputInfo, useInput } from '../hooks/use-input';
import { OrderAddDto } from '../dto.types';
import { validateText, validateYear } from '../validation/validation-rules';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const MIN_TITLE_LENGTH = 4;
const MAX_TITLE_LENGTH = 30;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 35;
const MIN_YEAR_OF_BIRTH = 1800;
const MAX_YEAR_OF_BIRTH = 2014;

type AddOrderFormProps = {
  onValidSubmit: (order: OrderAddDto) => void;
};

export function AddOrderForm(props: AddOrderFormProps) {
  const title = useInput('', (input: string) =>
    validateText(input, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH));

  const client = useInput('', (input: string) =>
    validateText(input, MIN_NAME_LENGTH, MAX_NAME_LENGTH));

  const yearOfBirth = useInput('', (input: string) =>
    validateYear(input, MIN_YEAR_OF_BIRTH, MAX_YEAR_OF_BIRTH));

  const imports = [Input, Button];

  const template = `
  <div class="card mt-4">
    <div class="card-body">
      <h4 class="card-title mb-3">Зробити замовлення</h4>
      <form @submit={handleSubmit}>
        <Input 
          .id="book-title" 
          .type="text" 
          .label="Назва страви"
          .placeholder="e.g. Піца карбонара"
          *={title}
        />
        <Input
          .id="client-name"
          .type="text"
          .label="Ваше ім'я"
          .placeholder="Введіть ім'я"
          *={client}
        />
        <Input
          .id="birth-year"
          .type="text"
          .label="Ваш рік народження"
          .placeholder="Введіть рік"
          *={yearOfBirth}
        />
        <Button
          .type="submit"
          .style="success"
          .disabled={cannotSubmit}
        >
          Додати Книгу
        </Button>
      </form>
    </div>
  </div>`;

  const attach = {
    title,
    client,
    yearOfBirth,
    cannotSubmit: [title, client, yearOfBirth]
      .some((info: InputInfo) => !info.isDirty || info.error),
    handleSubmit: (e: Event) => {
      e.preventDefault();

      const dto: OrderAddDto = {
        title: title.value,
        client: client.value,
        birthYear: parseInt(yearOfBirth.value),
      };
      props.onValidSubmit(dto);
    },
  };

  return { imports, template, attach };
}
