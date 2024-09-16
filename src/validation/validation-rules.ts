export function validateText(
  text: string,
  minLength?: number,
  maxLength?: number,
): string | null {
  const trimedText = text.trim();

  if (trimedText === '') {
    return "Це поле є обов'язкове";
  }
  if (minLength !== undefined && trimedText.length < minLength) {
    return `Мінімальна довжина поля - ${minLength}`;
  }
  if (maxLength !== undefined && trimedText.length > maxLength) {
    return `Максимальна довжина поля - ${maxLength}`;
  }
  return null;
}

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export function validateEmail(
  email: string,
): string | null {
  const trimed = email.trim();

  if (trimed === '') {
    return "Це поле є обов'язкове";
  }
  if (!EMAIL_REGEX.test(trimed)) {
    return `Неправильний формат email`;
  }
  return null;
}

export function validateYear(
  yearStr: string,
  minYear?: number,
  maxYear?: number,
): string | null {
  if (yearStr.trim() === '') {
    return "Це поле є обов'язкове";
  }
  var year = parseInt(yearStr, 10);

  if (isNaN(year) || yearStr !== '' + year) {
    return `Невалідне число`;
  }
  if (minYear !== undefined && year < minYear) {
    return `Мінімальний рік - ${minYear}`;
  }
  if (maxYear !== undefined && year > maxYear) {
    return `Максимальний рік - ${maxYear}`;
  }
  return null;
}

export function validateIntId(idStr: string): string | null {
  const MIN_ID = 1;

  if (idStr.trim() === '') {
    return "Це поле є обов'язкове";
  }
  var id = parseInt(idStr, 10);

  if (isNaN(id) || idStr !== '' + id) {
    return `Невалідний ідентифікатор`;
  }
  if (id < MIN_ID) {
    return `Мінімальне значення ID - ${MIN_ID}`;
  }
  return null;
}
