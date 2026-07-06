import type { ReactNode } from 'react';

import { Header } from '@/widgets/header';

export const Layout = ({ children }: { children: ReactNode }) => (
  <div>
    <Header />
    {children}
  </div>
);
