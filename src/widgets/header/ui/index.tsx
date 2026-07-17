import { useLayoutEffect, useRef, useState } from 'react';

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

export const Header = () => {
  const headerRef = useRef<HTMLHeadElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current?.offsetHeight);
  }, []);

  document.addEventListener('scroll', function () {
    if (window.scrollY > headerHeight) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <header
      ref={headerRef}
      className={`flex flex-col justify-between w-full py-2 gap-y-2 sticky top-0 bg-background z-10 transition-opacity duration-500 ${isScrolled ? 'opacity-[97%]' : ''}`}
    >
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

      <Navigation className="hidden lg:flex" />
    </header>
  );
};
