import { useTheme } from '@/shared/hooks';
import { cn } from '@/shared/lib';
import type { Theme } from '@/shared/types';
import { DropdownMenuItem } from '@/shared/ui';

interface IProps {
  themeType: Theme;
  names: Record<Theme, string>;
}

export const MenuItem = ({ themeType, names }: IProps) => {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenuItem
      onClick={() => setTheme(themeType)}
      className={cn(theme === themeType && 'bg-accent text-accent-foreground')}
    >
      {names[themeType]}
    </DropdownMenuItem>
  );
};
