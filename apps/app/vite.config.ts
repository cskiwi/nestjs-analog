/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import tsConfigPaths from 'vite-tsconfig-paths';
import { nestRequestAdapter } from './nest-request-adapter';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    publicDir: 'src/public',
    root: 'apps/app',
    build: {
      target: ['es2020'],
    },

    plugins: [
      ...VitePluginNode({
        adapter: nestRequestAdapter,
        appPath: 'src/server/main.ts',
        tsCompiler: 'swc',
        swcOptions: {},
      }),
      analog({
        apiPrefix: '/api',
        nitro: {
          preset: 'vercel',
        },
      }),
      tsConfigPaths({
        root: '../../',
      }),
      splitVendorChunkPlugin(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      cache: {
        dir: `../../node_modules/.vitest`,
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
    optimizeDeps: {
      // Vite does not work well with optionnal dependencies,
      // mark them as ignored for now
      // see: https://github.com/axe-me/vite-plugin-node/blob/main/examples/nest/vite.config.ts
      exclude: [
        '@nestjs/microservices',
        '@nestjs/websockets',
        'cache-manager',
        'class-transformer',
        'class-validator',
        'fastify-swagger',
      ],
    },
  };
});
