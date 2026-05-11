import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.stories.ts', 'src/env.d.ts'],
    },
  },
});
