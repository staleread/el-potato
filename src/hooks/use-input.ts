import { tempo } from '@staleread/tempo';

export type InputInfo = {
  value: string;
  isDirty: boolean;
  error: string | null;
  onInput: (e: Event) => void;
  onChange: (e: Event) => void;
  onBlur: () => void;
};

export function useInput(
  initialValue: string,
  validateCallback?: (value: string) => string | null,
) {
  const [value, setValue] = tempo.useState(initialValue);
  const [isDirty, setIsDirty] = tempo.useState(false);
  const [error, setError] = tempo.useState<string | null>(null);

  tempo.useEffect(() => {
    if (validateCallback) {
      setError(validateCallback(value));
    }
  }, [value]);

  const onInput = (e: Event) =>
    setValue((e.target as HTMLInputElement).value);

  const onChange = (e: Event) =>
    setValue((e.target as HTMLInputElement).value);

  const onBlur = () => setIsDirty(true);

  return {
    value,
    isDirty,
    error,
    onInput,
    onChange,
    onBlur,
  };
}
