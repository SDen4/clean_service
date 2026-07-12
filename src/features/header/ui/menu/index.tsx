import { Link } from 'react-router-dom';
import { Mail, MenuIcon, PhoneForwarded } from 'lucide-react';

import { ModeToggle } from '@/features/user';

import {
  contacts,
  HeaderMailItem,
  HeaderPhoneItem,
  mail,
} from '@/entities/header';
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
} from '@/shared/ui';

interface IProps {
  className?: string;
}

export const Menu = ({ className }: IProps) => (
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
        <DropdownMenuGroup>
          <DropdownMenuLabel>Контакты</DropdownMenuLabel>
          <div className="flex flex-col gap-y-2 w-full">
            {contacts.map((el) => (
              <div className="flex justify-between gap-2" key={el.id}>
                <HeaderPhoneItem hideIcon name={el.name} tel={el.tel} />
                <PhoneForwarded className="size-5 pt-1" />
              </div>
            ))}
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Почта</DropdownMenuLabel>
          <DropdownMenuItem>
            <div className="flex justify-between gap-2">
              <HeaderMailItem hideIcon mail={mail} />
              <Mail className="size-5 pt-1" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Навигация</DropdownMenuLabel>

          {navigationData.map((el) => (
            <DropdownMenuItem key={el.id} onMouseEnter={el.importFunc}>
              <Link to={el.route} className="flex justify-between w-full">
                {el.title}
                <DropdownMenuShortcut>{el.icon}</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Оформление</DropdownMenuLabel>

          <div className="flex items-center w-full justify-between">
            <p>Тема</p>
            <ModeToggle />
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);
