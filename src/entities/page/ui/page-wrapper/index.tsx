import type { ReactNode } from 'react';

import { ErrorBoundary } from '@/shared/ui';

interface IProps {
  children: ReactNode;
}

export const PageWrapper = ({ children }: IProps) => (
  <ErrorBoundary>{children}</ErrorBoundary>
);
