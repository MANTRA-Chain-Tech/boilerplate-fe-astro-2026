import type { StorybookConfig } from '@storybook-astro/framework';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook-astro/framework',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
