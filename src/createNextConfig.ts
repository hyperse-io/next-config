import type { NextConfig } from 'next';

/**
 * A function that takes an optional Next.js config and returns a modified Next.js config
 */
export type NextConfigPlugin = (config?: NextConfig | undefined) => NextConfig;

/**
 * Creates a normalized Next.js config by sequentially applying plugins to the initial config.
 * Each plugin can modify or transform the config object.
 * @param initConfig The initial Next.js configuration object
 * @param plugins An array of plugin functions that transform the config
 * @returns The final Next.js config after applying all plugins in sequence
 */
export const createNextConfig = (
  initConfig: NextConfig,
  plugins: Array<NextConfigPlugin> = []
) => {
  return plugins.reduce((config, plugin) => plugin(config), initConfig);
};
