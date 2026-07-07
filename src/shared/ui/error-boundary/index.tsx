import type { ReactNode } from 'react';
import { Component } from 'react';

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

    const onClick = () => window.location.reload();

    if (error) {
      return (
        <div>
          <h1>Error Page</h1>
          <br />
          <button onClick={onClick}>Перезагрузить</button>
        </div>
      );
    }

    return children;
  }
}
