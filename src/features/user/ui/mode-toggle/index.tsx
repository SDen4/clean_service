import { Moon, Sun } from 'lucide-react';

import type { Theme } from '@/shared/types';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

import { MenuItem } from './menu-item';

const names: Record<Theme, string> = {
  light: 'Светлая тема',
  dark: 'Темная тема',
  system: 'Системная тема',
};

interface IProps {
  className?: string;
}

export const ModeToggle = ({ className }: IProps) => {
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {Object.keys(names).map((el) => (
            <MenuItem key={el} themeType={el as Theme} names={names} />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
