import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Loader } from '@/shared/ui';

import { Layout } from '../layout';

export const MainLayout = () => {
  return (
    <Layout>
      <Toaster />
      <Suspense fallback={<Loader className="min-h-[50vh]" />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
};
