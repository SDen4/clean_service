import type { ReactNode } from 'react';
import { Component } from 'react';
import { Ban, RefreshCw } from 'lucide-react';

import logo from '../../assets/logoCompressed.png';
import { Button } from '../button';

const CHUNK_LOAD_ERROR_MESSAGES = [
  'Failed to fetch dynamically imported module',
  'Importing a module script failed',
  'error loading dynamically imported module',
  'Failed to load module script',
  'Loading chunk',
  'Failed to fetch',
];

const wrapperStyles =
  'flex flex-col gap-16 h-[90vh] w-full items-center justify-center';
const iconStyles =
  'fill-gray-100 stroke-orange-500 size-24 absolute top-24 left-[70px]';
const imgWrapperStyles = 'relative -mt-48';

const Img = () => <img src={logo} alt="логотип" className="w-60 h-40" />;

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

    const isChunkLoadError =
      error != null &&
      ((typeof error === 'object' &&
        'message' in error &&
        typeof error.message === 'string' &&
        CHUNK_LOAD_ERROR_MESSAGES.some((msg) => error.message.includes(msg))) ||
        (typeof error === 'object' &&
          'name' in error &&
          error.name === 'ChunkLoadError'));

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

    const isChunkLoadError =
      error?.message?.includes('Failed to fetch dynamically imported module') ||
      error?.name === 'ChunkLoadError';

    if (isChunkLoadError) {
      return (
        <div className={wrapperStyles}>
          <div className={imgWrapperStyles}>
            <Img />
            <RefreshCw className={iconStyles} />
          </div>

          <h1>Доступна новая версия сайта</h1>
          <h2>Перезагружаем…</h2>
        </div>
      );
    }

    if (error) {
      return (
        <div className={wrapperStyles}>
          <div className={imgWrapperStyles}>
            <Img />
            <Ban className={iconStyles} />
          </div>

          <h1>Ошибка приложения</h1>

          <Button variant="outline" onClick={onReload}>
            <RefreshCw /> Перезагрузить
          </Button>
        </div>
      );
    }

    return children;
  }
}
