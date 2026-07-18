import { RouterProvider } from 'react-router-dom';

import { ErrorBoundary } from '@/shared/ui';

import { browserRouter } from './router/browser-router';

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={browserRouter} />
    </ErrorBoundary>
  );
}

export default App;
