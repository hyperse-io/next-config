import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { createNextConfigEnv } from '../src/createNextConfigEnv.js';
import { printEnv } from '../src/printEnv.js';

// Mock console.error and process.exit
vi.spyOn(console, 'error').mockImplementation(() => {});
vi.spyOn(process, 'exit').mockImplementation((code) => {
  throw new Error(`Process.exit called with code ${code}`);
});

// Mock printEnv
vi.mock('../src/printEnv.js', () => ({
  printEnv: vi.fn(),
}));

describe('createNextConfigEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset process.env before each test
    process.env = { ...originalEnv };
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore process.env after each test
    process.env = originalEnv;
  });

  it('should successfully validate environment variables', () => {
    const schema = z.object({
      PORT: z.string(),
      DATABASE_URL: z.url(),
    });

    process.env.PORT = '3000';
    process.env.DATABASE_URL = 'https://example.com/db';

    const env = createNextConfigEnv(schema);

    expect(env).toEqual({
      PORT: '3000',
      DATABASE_URL: 'https://example.com/db',
    });
    expect(printEnv).toHaveBeenCalled();
  });

  it('should throw error for invalid environment variables', () => {
    const schema = z.object({
      PORT: z.string(),
      DATABASE_URL: z.url(),
    });

    process.env.PORT = '3000';
    process.env.DATABASE_URL = 'invalid-url';

    expect(() => createNextConfigEnv(schema)).toThrow(
      'Process.exit called with code 1'
    );
    expect(console.error).toHaveBeenCalled();
  });

  it('should work with optional environment variables', () => {
    const schema = z.object({
      PORT: z.string().optional(),
      DATABASE_URL: z.url(),
    });

    process.env.DATABASE_URL = 'https://example.com/db';

    const env = createNextConfigEnv(schema);

    expect(env).toEqual({
      PORT: undefined,
      DATABASE_URL: 'https://example.com/db',
    });
  });

  it('should accept custom environment variables', () => {
    const schema = z.object({
      PORT: z.string(),
    });

    const customEnv = {
      PORT: '4000',
    };

    const env = createNextConfigEnv(schema, customEnv);

    expect(env).toEqual({
      PORT: '4000',
    });
  });

  it('should show different messages based on NODE_ENV', () => {
    const schema = z.object({
      PORT: z.string(),
    });

    // Test production environment
    (process.env as any).NODE_ENV = 'production';
    process.env.PORT = '3000';

    createNextConfigEnv(schema);
    expect(printEnv).toHaveBeenCalledWith('Build env(s)', expect.any(Object));

    vi.clearAllMocks();

    // Test development environment
    (process.env as any).NODE_ENV = 'development';

    createNextConfigEnv(schema);
    expect(printEnv).toHaveBeenCalledWith('Server env(s)', expect.any(Object));
  });
});
