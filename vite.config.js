import path from 'path';
import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';

const jsxInJsRoots = /\/src\/(chrome\/awb\/dcc|lab-host)\/.+\.js$/;

/** Vendored AWB modules use `.js` with JSX — pre-transform for Rollup import analysis. */
function awbJsxJs() {
  return {
    name: 'awb-jsx-js',
    enforce: 'pre',
    async transform(code, id) {
      if (!jsxInJsRoots.test(id)) return null;
      return transformWithEsbuild(code, id, {
        loader: 'jsx',
        jsx: 'automatic',
      });
    },
  };
}

export default defineConfig({
  plugins: [
    awbJsxJs(),
    react({
      include: [/\/src\/.*\.jsx$/, jsxInJsRoots],
    }),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: [
      { find: '@/assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@dcc', replacement: path.resolve(__dirname, 'src/chrome/awb/dcc') },
      { find: '@', replacement: path.resolve(__dirname, 'src/lab-host') },
    ],
  },
  server: {
    port: 3001,
    open: '/dashboards/account',
  },
});
