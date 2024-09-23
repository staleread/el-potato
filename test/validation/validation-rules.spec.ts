import {
  validateEmail,
  validateIntId,
  validateText,
  validateYear,
} from '../../src/validation/validation-rules';

describe('validateText', () => {
  it('should return required message if text is empty', () => {
    expect(validateText('')).toBe("Це поле є обов'язкове");
  });

  it('should return null if text is valid and within limits', () => {
    expect(validateText('Valid text')).toBeNull();
  });

  it('should return minimum length error if text is too short', () => {
    expect(validateText('123', 5)).toBe('Мінімальна довжина поля - 5');
  });

  it('should return maximum length error if text is too long', () => {
    expect(validateText('1234567890', undefined, 5)).toBe(
      'Максимальна довжина поля - 5',
    );
  });
});

describe('validateEmail', () => {
  it('should return required message if email is empty', () => {
    expect(validateEmail('')).toBe("Це поле є обов'язкове");
  });

  it('should return null if email is valid', () => {
    expect(validateEmail('test@example.com')).toBeNull();
  });

  it('should return invalid format message if email is incorrect', () => {
    expect(validateEmail('invalid-email')).toBe(
      'Неправильний формат email',
    );
  });
});

describe('validateYear', () => {
  it('should return required message if year is empty', () => {
    expect(validateYear('')).toBe("Це поле є обов'язкове");
  });

  it('should return invalid number if year is not a valid number', () => {
    expect(validateYear('abcd')).toBe('Невалідне число');
  });

  it('should return minimum year error if year is too low', () => {
    expect(validateYear('1990', 2000)).toBe('Мінімальний рік - 2000');
  });

  it('should return maximum year error if year is too high', () => {
    expect(validateYear('2025', undefined, 2020)).toBe(
      'Максимальний рік - 2020',
    );
  });

  it('should return null if year is valid and within limits', () => {
    expect(validateYear('2005', 1990, 2020)).toBeNull();
  });
});

describe('validateIntId', () => {
  it('should return required message if ID is empty', () => {
    expect(validateIntId('')).toBe("Це поле є обов'язкове");
  });

  it('should return invalid ID message if ID is not a valid number', () => {
    expect(validateIntId('abcd')).toBe('Невалідний ідентифікатор');
  });

  it('should return minimum ID error if ID is less than 1', () => {
    expect(validateIntId('0')).toBe('Мінімальне значення ID - 1');
  });

  it('should return null if ID is valid', () => {
    expect(validateIntId('5')).toBeNull();
  });
});
