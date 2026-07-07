import { RouterProvider } from 'react-router-dom';

import { ErrorBoundary } from '@/shared/ui';

import { browserRouter } from './router/browser-router';

function App() {
  return (
    <main className="p-2">
      <ErrorBoundary>
        <RouterProvider router={browserRouter} />
      </ErrorBoundary>
    </main>
  );
}

export default App;
