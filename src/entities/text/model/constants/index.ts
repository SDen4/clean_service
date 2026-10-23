import { withMask } from 'use-mask-input';

export const currentYear = new Date().getFullYear() || 2026;

/** Маска ввода телефонного номера */
export const phoneMask = withMask('\\+7 (\\999) 999-99-99');
