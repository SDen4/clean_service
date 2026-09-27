// Добавить юнит-тесты

/** Приводит одиночный элемент к массиву (fast-xml-parser так не делает сам) */
export const toArray = <T>(value: T | T[] | undefined): T[] =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];
