import { cn } from '@/shared/lib';
import type { Theme } from '@/shared/model';
import { useTheme } from '@/shared/model';
import { DropdownMenuItem } from '@/shared/ui';

interface IProps {
  themeType: Theme;
  names: Record<Theme, string>;
}

export const MenuItem = ({ themeType, names }: IProps) => {
  const { setTheme, theme } = useTheme();

  const onClick = () => setTheme(themeType);

  return (
    <DropdownMenuItem
      onClick={onClick}
      className={cn(
        theme === themeType
          ? 'bg-accent text-accent-foreground'
          : 'cursor-pointer',
      )}
    >
      {names[themeType]}
    </DropdownMenuItem>
  );
};
