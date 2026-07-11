import { Menu } from '@/features/header';
import { Navigation } from '@/features/navigation';
import { ModeToggle } from '@/features/user';

import {
  contacts,
  HeaderMailItem,
  HeaderPhoneItem,
  LinkLogo,
  mail,
} from '@/entities/header';

export const Header = () => (
  <header className="flex flex-col justify-between w-full pt-0 pb-2 gap-y-2">
    <div className="flex justify-between w-full items-center">
      <LinkLogo />

      <div className="hidden lg:flex items-center gap-6">
        {contacts.map((el) => (
          <HeaderPhoneItem name={el.name} tel={el.tel} key={el.id} />
        ))}
        <HeaderMailItem mail={mail} />
      </div>

      <ModeToggle className="hidden lg:block" />

      <Menu className="lg:hidden" />
    </div>

    <Navigation />
  </header>
);
