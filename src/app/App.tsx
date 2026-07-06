import { RouterProvider } from 'react-router-dom';

import { browserRouter } from './router/browser-router';

function App() {
  return (
    <main className="p-2">
      <RouterProvider router={browserRouter} />
    </main>
  );
}

export default App;
