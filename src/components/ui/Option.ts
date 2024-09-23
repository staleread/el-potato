export type OptionInfo = {
  value: string;
  displayValue: string;
};

type OptionProps = {
  value: string;
  selectedValue: string;
};

export function Option({ value, selectedValue }: OptionProps) {
  const template = `
  <option value="{value}" selected={isSelected}>
    <#children/>
  </option>`;

  const attach = {
    value,
    isSelected: value === selectedValue,
  };

  return { template, attach };
}
