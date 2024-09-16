type InputProps = {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  value: string;
  isDirty: boolean;
  error: string | null;
  onInput: (e?: Event) => void;
  onBlur: (e?: Event) => void;
};

export function Input(props: InputProps) {
  const template = `
  <div class="form-group mb-3">
    <label for="{props.id}" $if :yes {props.label}>
      {props.label}
    </label>
    <input 
      type="{props.type}"
      class="form-control {inputClass}"
      id="{props.id}"
      value="{props.value}"
      placeholder="{props.placeholder}"
      @input={props.onInput}
      @blur={props.onBlur}
    />
    <span class="help-block text-danger" $if :yes {shouldShowError}>
      {props.error}
    </span>
  </div>`;

  const attach = {
    props,
    inputClass: props.isDirty
      ? props.error 
        ? 'is-invalid' 
        : 'is-valid'
      : '',
    shouldShowError: props.isDirty && props.error,
  };

  return { template, attach };
}
