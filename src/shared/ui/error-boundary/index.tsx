import type { ReactNode } from 'react';
import { Component } from 'react';
import { Ban, RefreshCw } from 'lucide-react';

import { Button } from '../button';
import { isChunkLoadErrorFunc } from './isChunkLoadErrorFunc';

import { ErrorPageWrapper } from '../error-page-wrapper';

interface IProps {
  children: ReactNode;
  props?: unknown;
}

interface IState {
  error: unknown;
  errorInfo: unknown;
}

export class ErrorBoundary extends Component<IProps, IState> {
  private timerId: ReturnType<typeof setTimeout> | null = null;

  constructor(props: IProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    this.setState({ error, errorInfo });
  }

  componentDidMount() {
    this.maybeScheduleReload();
  }

  componentDidUpdate(_prevProps: IProps, prevState: IState) {
    if (this.state.error !== prevState.error) {
      this.maybeScheduleReload();
    }
  }

  componentWillUnmount() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  maybeScheduleReload() {
    const error = this.state.error as {
      message: string;
      name: string;
    } | null;

    const isChunkLoadError = isChunkLoadErrorFunc(error);

    if (isChunkLoadError && this.timerId === null) {
      this.timerId = setTimeout(() => window.location.reload(), 2000);
    }
  }

  render(): ReactNode {
    const error = this.state.error as {
      message: string;
      name: string;
    } | null;
    const { children } = this.props;

    const onReload = () => window.location.reload();

    const isChunkLoadError = isChunkLoadErrorFunc(error);

    if (isChunkLoadError) {
      return (
        <ErrorPageWrapper icon={RefreshCw}>
          <h1 className="text-center">Доступна новая версия сайта</h1>
          <h2>Перезагружаем…</h2>
        </ErrorPageWrapper>
      );
    }

    if (error) {
      return (
        <ErrorPageWrapper icon={Ban}>
          <h1 className="text-center">Ошибка приложения</h1>
          <Button variant="outline" onClick={onReload}>
            <RefreshCw /> Перезагрузить
          </Button>
        </ErrorPageWrapper>
      );
    }

    return children;
  }
}
