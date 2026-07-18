import { RouterProvider } from 'react-router-dom';

import { ErrorBoundary } from '@/shared/ui';

import { browserRouter } from './router/browser-router';

function App() {
  return (
    <main className="flex flex-col gap-4 px-2 py-4 max-w-screen-xl w-full">
      <ErrorBoundary>
        <RouterProvider router={browserRouter} />
      </ErrorBoundary>
    </main>
  );
}

export default App;
