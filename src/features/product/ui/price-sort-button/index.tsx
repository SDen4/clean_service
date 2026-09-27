import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { Button } from '@/shared/ui';

import type { TSortState } from '../../model/types';

interface IProps {
  sort: TSortState;
  setSort: React.Dispatch<React.SetStateAction<TSortState>>;
}

export const PriceSortButton = ({ sort, setSort }: IProps) => {
  const onClick = () => {
    setSort((prev) => {
      if (prev === 'none') return 'asc';
      if (prev === 'asc') return 'desc';
      return 'none';
    });
  };

  const icon = {
    none: <ArrowUpDown className="h-4 w-4" />,
    asc: <ArrowUp className="h-4 w-4" />,
    desc: <ArrowDown className="h-4 w-4" />,
  }[sort];

  return (
    <Button variant="outline" onClick={onClick}>
      {icon}
      <span>Цена</span>
    </Button>
  );
};
