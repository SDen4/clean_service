import { useScrolled } from '@/shared/model';

interface IProps {
  /** Признак страницы с результатами поиска в каталоге */
  isSearchPage: boolean;
}

/** Заголовок каталога */
export const Title = ({ isSearchPage }: IProps) => {
  const { isScrolled } = useScrolled();

  if (isScrolled) return null;

  return <h2>Каталог {isSearchPage && '(поиск)'}</h2>;
};
