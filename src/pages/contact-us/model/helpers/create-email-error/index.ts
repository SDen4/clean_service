const regExp = new RegExp('^[\\w.-]+@[\\w-]+\\.[a-zA-Z]{2,}$');

/** Генерация текстов ошибок email */
export const createEmailError = (email?: string) => {
  if (!email) return 'Email обязателен';

  if (!regExp.test(email)) return 'Неверный формат email';

  return '';
};
