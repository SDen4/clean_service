import type { ReactNode } from 'react';
import { Component } from 'react';
import { Ban, RefreshCw } from 'lucide-react';

import logo from '../../assets/logoCompressed.png';
import { Button } from '../button';

interface IProps {
  children: ReactNode;
  props?: unknown;
}

interface IState {
  error: unknown;
  errorInfo: unknown;
}

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    this.setState({ error, errorInfo });
  }

  render(): ReactNode {
    const { error } = this.state;
    const { children } = this.props;

    const onReload = () => window.location.reload();

    if (error) {
      return (
        <div className="flex flex-col gap-10">
          <div className="relative -mt-48">
            <img src={logo} alt="логотип" className="w-60 h-40" />
            <Ban className="fill-gray-100 stroke-orange-500 size-24 absolute top-24 left-[70px]" />
          </div>

          <h1>Ошибка приложения</h1>

          <Button onClick={onReload}>
            <RefreshCw /> Перезагрузить
          </Button>
        </div>
      );
    }

    return children;
  }
}
