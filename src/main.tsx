import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app/App.tsx';
import { ThemeProvider } from '@/app/theme-provider/theme-provider.tsx';

import './global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
);

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/clean_service/sw.js')
      // eslint-disable-next-line no-console
      .catch((err) => console.error('SW registration failed:', err));
  });
}
