type ButtonStyle =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  style: ButtonStyle;
  disabled: boolean;
};

export function Button(props: ButtonProps) {
  const template = `
  <button 
    type="{props.type}" 
    class="btn btn-{props.style}"
    disabled={props.disabled}
  >
    <#children/>
  </button>`;

  const attach = {
    props,
  };

  return { template, attach };
}
