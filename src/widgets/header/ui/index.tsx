import { Navigation } from '@/features/navigation';
import { ModeToggle } from '@/features/user';

import { HeaderMailItem, HeaderPhoneItem, LinkLogo } from '@/entities/header';

const contacts = [
  { name: 'Сергей', tel: '+7 (902) 27-03-888', id: 1 },
  { name: 'Вячеслав', tel: '+7 (922) 22-37-787', id: 2 },
];

export const Header = () => (
  <header className="flex flex-col justify-between w-full pt-0 pb-2 gap-y-2">
    <div className="flex justify-between w-full items-center">
      <LinkLogo />

      <div className="flex items-center gap-6">
        {contacts.map((el) => (
          <HeaderPhoneItem name={el.name} tel={el.tel} key={el.id} />
        ))}
        <HeaderMailItem mail="bep-remont@mail.ru" />

        <ModeToggle />
      </div>
    </div>

    <Navigation />
  </header>
);
