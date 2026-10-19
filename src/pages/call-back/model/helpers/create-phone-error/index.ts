const validPhoneValueLength = 11; // валидная длина телефонного номера со всеми символами (например: 79222222222)

/** Генерация ошибок ввода телефонного номера */
export const createPhoneError = (phone?: string) => {
  if (!phone) return 'Телефон обязателен';

  const formattedNumber = phone.replace(/\D/g, ''); // только цифры (например: 79222222222)

  if (String(formattedNumber).length < validPhoneValueLength) {
    return 'Неправильный формат телефона';
  }

  return '';
};
