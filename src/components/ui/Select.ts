import { tempo } from '@staleread/tempo';
import { Option, OptionInfo } from './Option';

type SelectProps = {
  id: string;
  placeholder?: string;
  label?: string;
  options: OptionInfo[];
  value?: string;
  isDirty: boolean;
  error: string | null;
  onBlur: (e?: Event) => void;
  onChange: (e?: Event) => void;
};

export function Select(props: SelectProps) {
  const imports = [Option];

  const template = `
  <div class="form-group mb-3">
    <label :if={props.label} for="{props.id}">{props.label}</label>
    <select
      class="form-select {selectClass}"
      id="{props.id}"
      disabled={props.isReadonly}
      @change={props.onChange}
      @blur={props.onBlur}
    >

      <!-- placeholder option -->
      <option
        :if={props.placeholder}
        disabled={true}
        selected={isNoneSelected}
        value="">
        {props.placeholder}
      </option>

      <!-- selectable options -->
      <Option
        :kmap={option in props.options by option.value}
        .value="{option.value}"
        .selectedValue="{props.seelectedId}"
      >
        {option.displayValue}
      </Option>
    </select>
    <span :if={shouldShowError} class="help-block text-danger">
      {props.error}
    </span>
  </div>`;

  const attach = {
    props,
    selectClass: props.isDirty
      ? props.error
        ? 'is-invalid'
        : 'is-valid'
      : '',
    shouldShowError: props.isDirty && props.error,
    isNoneSelected: props.value === '',
  };

  return { imports, template, attach };
}
