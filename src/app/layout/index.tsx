import type { ReactNode } from 'react';

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import { TooltipProvider } from '@/shared/ui';

const tooltipDelay = 1000; // ms

export const Layout = ({ children }: { children: ReactNode }) => (
  <TooltipProvider delay={tooltipDelay}>
    <Header />
    <main className="flex flex-col flex-1 gap-4 px-2 pt-4 pb-6 max-w-screen-xl w-full">
      {children}
    </main>
    <Footer />
  </TooltipProvider>
);
