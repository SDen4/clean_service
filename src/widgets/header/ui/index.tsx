import { lazy, useCallback, useEffect, useRef, useState } from 'react';

import { Navigation } from '@/features/navigation';
import { ModeToggle } from '@/features/user';

import { contacts, mail, MailItem, PhoneItem } from '@/entities/contact';
import { LinkLogo } from '@/entities/header';
import { BlockWrapper } from '@/entities/page';
import { Tooltip } from '@/entities/tooltip';

const MenuLazy = lazy(() => import('@/features/header'));

const windowWidthForMenuVisible = 1024;

export const Header = () => {
  const headerRef = useRef<HTMLHeadElement | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  const scrollListenerFunc = useCallback(
    () => setIsScrolled(window.scrollY > 0),
    [],
  );
  const resizeListenerFunc = useCallback(() => {
    if (headerRef?.current?.clientWidth) {
      setMobileMenuVisible(
        Boolean(headerRef.current.clientWidth < windowWidthForMenuVisible),
      );
    }
  }, []);

  useEffect(() => {
    resizeListenerFunc();
    window.addEventListener('resize', resizeListenerFunc);
    return () => {
      window.removeEventListener('resize', resizeListenerFunc);
    };
  }, [resizeListenerFunc]);

  useEffect(() => {
    document.addEventListener('scroll', scrollListenerFunc);
    return () => {
      document.removeEventListener('scroll', scrollListenerFunc);
    };
  }, [scrollListenerFunc]);

  return (
    <header
      ref={headerRef}
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

          {isMobileMenuVisible && <MenuLazy className="lg:hidden" />}
        </div>

        <Navigation className="hidden lg:flex" />
      </BlockWrapper>
    </header>
  );
};
