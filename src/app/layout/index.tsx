import { lazy, type ReactNode } from 'react';

import { Header } from '@/widgets/header';

import { Breadcrumb } from '@/features/breadcrumb';

import { TooltipProvider } from '@/shared/ui';

const FooterLazy = lazy(() => import('@/widgets/footer'));

const tooltipDelay = 1000; // ms

export const Layout = ({ children }: { children: ReactNode }) => (
  <TooltipProvider delay={tooltipDelay}>
    <Header />
    <Breadcrumb />
    <main className="flex flex-col flex-1 gap-4 px-2 pt-4 pb-6 max-w-screen-xl w-full">
      {children}
    </main>
    <FooterLazy />
  </TooltipProvider>
);
