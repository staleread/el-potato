import { ButtonStyle } from './ui.types';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  style: ButtonStyle;
  disabled: boolean;
  onClick: (e?: Event) => void;
};

export function Button(props: ButtonProps) {
  const template = `
  <button
    type="{props.type}"
    class="btn btn-{props.style}"
    disabled={props.disabled}
    @click={props.onClick}
  >
    <#children/>
  </button>`;

  const attach = {
    props,
  };

  return { template, attach };
}
