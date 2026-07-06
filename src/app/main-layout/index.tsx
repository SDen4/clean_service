import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout } from '../layout';
import { Fallback } from './fallback';

export const MainLayout = () => {
  return (
    <Layout>
      <Suspense fallback={<Fallback />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
};
