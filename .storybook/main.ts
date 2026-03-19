import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
  async viteFinal(config) {
    return {
      ...config,
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [...(config.optimizeDeps?.include ?? []), 'motion', 'motion/react'],
      },
      ssr: {
        ...config.ssr,
        noExternal: [...(config.ssr?.noExternal ?? []), 'motion'],
      },
    };
  },
};
export default config;
