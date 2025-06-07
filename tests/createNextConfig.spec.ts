import type { NextConfig } from 'next';
import {
  createNextConfig,
  type NextConfigPlugin,
} from '../src/createNextConfig.js';

describe('createNextConfig', () => {
  const baseConfig: NextConfig = {
    reactStrictMode: true,
  };

  it('should return the initial config when no plugins are provided', () => {
    const result = createNextConfig(baseConfig);
    expect(result).toEqual(baseConfig);
  });

  it('should apply a single plugin correctly', () => {
    const plugin: NextConfigPlugin = (config) => ({
      ...config,
      output: 'standalone',
    });

    const result = createNextConfig(baseConfig, [plugin]);
    expect(result).toEqual({
      ...baseConfig,
      output: 'standalone',
    });
  });

  it('should apply multiple plugins in sequence', () => {
    const plugin1: NextConfigPlugin = (config) => ({
      ...config,
      output: 'standalone',
    });

    const plugin2: NextConfigPlugin = (config) => ({
      ...config,
      poweredByHeader: false,
    });

    const result = createNextConfig(baseConfig, [plugin1, plugin2]);
    expect(result).toEqual({
      ...baseConfig,
      output: 'standalone',
      poweredByHeader: false,
    });
  });

  it('should handle plugins that return undefined config', () => {
    const plugin: NextConfigPlugin = () => undefined as unknown as NextConfig;

    // This should not throw and should return the last valid config
    const result = createNextConfig(baseConfig, [plugin]);
    expect(result).toBeUndefined();
  });

  it('should preserve plugin chain order', () => {
    const plugin1: NextConfigPlugin = (config) => ({
      ...config,
      value: 1,
    });

    const plugin2: NextConfigPlugin = (config) => ({
      ...config,
      value: 2,
    });

    // Plugin2 should override plugin1's value
    const result = createNextConfig(baseConfig, [plugin1, plugin2]);
    expect(result).toEqual({
      ...baseConfig,
      value: 2,
    });
  });
});
