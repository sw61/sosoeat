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
    const prevNoExternal = config.ssr?.noExternal;
    const noExternal =
      prevNoExternal === true
        ? true
        : [
            ...(Array.isArray(prevNoExternal)
              ? prevNoExternal
              : prevNoExternal != null
                ? [prevNoExternal]
                : []),
            'framer-motion',
          ];

    return {
      ...config,
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [...(config.optimizeDeps?.include ?? []), 'framer-motion'],
      },
      ssr: {
        ...config.ssr,
        noExternal,
      },
    };
  },
};
export default config;
