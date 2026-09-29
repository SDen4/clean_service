/**
 * Форматирование чисел
 * @param num число
 * @param degree округление до
 * @param minDegree мин кол-во знаков после запятой
 * @returns string
 */
export const formatNumbers = (
  num?: number | null,
  degree = 0,
  minDegree = 0,
) => {
  if (typeof num !== 'number') return '';

  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: minDegree,
    maximumFractionDigits: degree,
  }).format(num);
};
