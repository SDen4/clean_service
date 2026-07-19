import { useState } from 'react';

import { Breadcrumb } from '@/features/breadcrumb';
import { Menu } from '@/features/header';
import { Navigation } from '@/features/navigation';
import { ModeToggle } from '@/features/user';

import { contacts, mail, MailItem, PhoneItem } from '@/entities/contact';
import { LinkLogo } from '@/entities/header';
import { BlockWrapper } from '@/entities/page';
import { Tooltip } from '@/entities/tooltip';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  document.addEventListener('scroll', function () {
    setIsScrolled(window.scrollY > 0);
  });

  return (
    <header
      className={`flex items-center justify-center w-full py-2 sticky top-0 bg-background z-10 transition-opacity duration-500 ${isScrolled ? 'opacity-[97%] shadow-md' : ''}`}
    >
      <BlockWrapper>
        <div className="flex justify-between w-full items-center">
          <Tooltip text="На главную страницу">
            <LinkLogo />
          </Tooltip>

          <div className="hidden items-start lg:flex gap-6">
            {contacts.map((el) => (
              <PhoneItem name={el.name} tel={el.tel} key={el.id} />
            ))}
            <MailItem mail={mail} />
          </div>

          <Tooltip text="Выбор цветовой темы">
            <ModeToggle className="hidden lg:block" />
          </Tooltip>

          <Menu className="lg:hidden" />
        </div>

        <Navigation className="hidden lg:flex" />

        <Breadcrumb />
      </BlockWrapper>
    </header>
  );
};
