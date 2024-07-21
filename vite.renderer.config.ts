import { defineConfig } from 'vite';

import { pluginExposeRenderer } from './vite.base.config';

import type { ConfigEnv, UserConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<'renderer'>;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  //@ts-expect-error  name: 'main_window'なのにneverとなるので無視
  const name = forgeConfigSelf.name ?? '';

  return {
    root,
    mode,
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    plugins: [pluginExposeRenderer(name)],
    resolve: {
      preserveSymlinks: true,
    },
    clearScreen: false,
  } as UserConfig;
});
