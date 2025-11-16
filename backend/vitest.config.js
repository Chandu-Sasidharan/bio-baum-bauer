import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      reporter: ['text', 'lcov'],
      include: ['src/**/*.js'],
      exclude: ['src/admin/**', 'src/templates/**'],
    },
  },
  resolve: {
    alias: {
      '#src': path.resolve(__dirname, 'src'),
      '#root': path.resolve(__dirname),
    },
  },
});
