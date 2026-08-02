import type { IContact } from '../types';

export const contacts: IContact[] = [
  {
    name: 'Сергей',
    tel: '+7 (902) 27-03-888',
    maxId: 'f9LHodD0cOK80nbz1VmpKAvcWA1KRWxq9pjyT4xCAa1CZR6pa9iRhjB6wj0',
    id: 1,
  },
  {
    name: 'Вячеслав',
    tel: '+7 (922) 22-37-787',
    maxId: 'f9LHodD0cOKGQSw9lYQmc1ICXsQvxMLnPfSY2RKyGY0EClJIua02KVDNZfM',
    id: 2,
  },
] as const;

export const mail = 'bepremont@mail.ru';
