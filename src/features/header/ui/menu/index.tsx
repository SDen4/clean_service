import { useLocation } from 'react-router-dom';
import { Mail, MenuIcon, PhoneForwarded } from 'lucide-react';

import { contacts, mail, MailItem, PhoneItem } from '@/entities/contact';
import { navigationData } from '@/entities/navigation';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Link,
} from '@/shared/ui';

import { ModeToggle } from '../mode-toggle';

interface IProps {
  className?: string;
}

const Menu = ({ className }: IProps) => {
  const { pathname } = useLocation();

  const isCurrentPage = (path: string) =>
    pathname !== '/' ? path === pathname.slice(1) : path === pathname;

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline">
              <MenuIcon />
            </Button>
          }
        />
        <DropdownMenuContent align="start">
          <DropdownMenuGroup className="flex flex-col gap-y-1">
            <DropdownMenuLabel>Телефоны</DropdownMenuLabel>
            <div className="flex flex-col gap-y-2 w-full">
              {contacts.map((el) => (
                <div className="flex justify-between gap-2 px-1" key={el.id}>
                  <PhoneItem hideIcon name={el.name} tel={el.tel} />
                  <PhoneForwarded className="size-5 pt-1" />
                </div>
              ))}
            </div>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Почта</DropdownMenuLabel>
            <DropdownMenuItem className="py-1">
              <div className="flex justify-between w-full">
                <MailItem hideIcon mail={mail} />
                <Mail className="size-5 pt-1" />
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Навигация</DropdownMenuLabel>

            {navigationData.map((el) =>
              isCurrentPage(el.route) ? (
                <span
                  key={el.id}
                  className="flex justify-between items-center w-full text-base opacity-50 py-1 px-1.5 bg-slate-100 rounded-sm"
                >
                  {el.title}
                  <DropdownMenuShortcut className="[&_svg]:max-w-4 [&_svg]:max-h-4">
                    {el.icon}
                  </DropdownMenuShortcut>
                </span>
              ) : (
                <DropdownMenuItem key={el.id} disabled={true}>
                  <Link
                    to={el.route}
                    className="flex items-center justify-between w-full text-base"
                  >
                    {el.title}
                    <DropdownMenuShortcut>{el.icon}</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              ),
            )}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup className="px-1">
            <DropdownMenuLabel className="px-0">Оформление</DropdownMenuLabel>

            <div className="flex items-center w-full justify-between">
              <p>Тема</p>
              <ModeToggle />
            </div>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Menu;
