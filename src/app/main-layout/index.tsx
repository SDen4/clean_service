import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Loader } from '@/shared/ui';

import { Layout } from '../layout';

export const MainLayout = () => {
  return (
    <Layout>
      <Suspense fallback={<Loader className="min-h-[50vh]" />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
};
