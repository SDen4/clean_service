import { useScrolled } from '@/shared/model';

interface IProps {
  isSearchPage: boolean;
}

export const Title = ({ isSearchPage }: IProps) => {
  const { isScrolled } = useScrolled();

  if (isScrolled) return null;

  return <h2>Каталог {isSearchPage && '(поиск)'}</h2>;
};
