import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';

function serviceWorkerPlugin(): Plugin {
  return {
    name: 'service-worker-build',
    apply: 'build',
    closeBundle() {
      const templatePath = path.resolve(import.meta.dirname, 'sw.template.js');
      const outPath = path.resolve(import.meta.dirname, 'dist/sw.js');

      if (!fs.existsSync(templatePath)) return;

      const template = fs.readFileSync(templatePath, 'utf8');
      const buildId = Date.now().toString(36);

      const output = template.replace(/__CACHE_VERSION__/g, buildId);

      fs.writeFileSync(outPath, output);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: '/clean_service/',
  server: { open: true },
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true, brotliSize: true }),
    serviceWorkerPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        strictExecutionOrder: true,
        codeSplitting: {
          maxSize: 250000,
          maxModuleSize: 250000,
          groups: [{ name: 'vendor', test: /node_modules/ }],
        },
      },
    },
  },
});
