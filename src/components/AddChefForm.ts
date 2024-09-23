import { tempo } from '@staleread/tempo';
import { ChefAddDto } from '../api/api.types';
import { InputInfo, useInput } from '../hooks/use-input';
import {
  validateEmail,
  validateText,
} from '../validation/validation-rules';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 35;

type AddChefFormProps = {
  onValidSubmit: (chef: ChefAddDto) => void;
};

export function AddChefForm(props: AddChefFormProps) {
  const name = useInput('', (input: string) =>
    validateText(input, MIN_NAME_LENGTH, MAX_NAME_LENGTH),
  );

  const email = useInput('', (input: string) => validateEmail(input));

  const imports = [Input, Button];

  const template = `
  <div class="card mt-4">
    <div class="card-body">
      <h4 class="card-title mb-3">Додати шефа</h4>
      <form @submit={handleSubmit}>
        <Input
          .id="chef-name"
          .type="text"
          .label="Як звати шефа?"
          .placeholder="Введіть ім'я"
          *={name}
        />
        <Input
          .id="chef-email"
          .type="text"
          .label="А email знаєте?"
          .placeholder="Введіть email"
          *={email}
        />
        <Button
          .type="submit"
          .style="success"
          .disabled={cannotSubmit}
        >
          Додати Шефа
        </Button>
      </form>
    </div>
  </div>`;

  const attach = {
    name,
    email,
    cannotSubmit: [name, email].some(
      (info: InputInfo) => !info.isDirty || info.error,
    ),
    handleSubmit: (e: Event) => {
      e.preventDefault();

      const dto: ChefAddDto = {
        name: name.value,
        email: email.value,
      };
      props.onValidSubmit(dto);
    },
  };

  return { imports, template, attach };
}
