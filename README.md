# @hyperse/next-config

Type-safe environment variables and runtime configuration patterns for Next.js applications

<p align="left">
  <a aria-label="Build" href="https://github.com/hyperse-io/next-config/actions?query=workflow%3ACI">
    <img alt="build" src="https://img.shields.io/github/actions/workflow/status/hyperse-io/next-config/ci-integrity.yml?branch=main&label=ci&logo=github&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="stable version" href="https://www.npmjs.com/package/@hyperse/next-config">
    <img alt="stable version" src="https://img.shields.io/npm/v/%40hyperse%2Fnext-config?branch=main&label=version&logo=npm&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="Top language" href="https://github.com/hyperse-io/next-config/search?l=typescript">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/hyperse-io/next-config?style=flat-square&labelColor=000&color=blue">
  </a>
  <a aria-label="Licence" href="https://github.com/hyperse-io/next-config/blob/main/LICENSE">
    <img alt="Licence" src="https://img.shields.io/github/license/hyperse-io/next-config?style=flat-quare&labelColor=000000" />
  </a>
</p>

A powerful utility package that provides type-safe environment variables and flexible configuration patterns for Next.js applications. Built with TypeScript and Zod for maximum type safety and runtime validation.

## Features

- 🔍 **Type-safe Environment Variables**: Validate and type-check your environment variables using Zod schemas
- 🛡️ **Runtime Validation**: Catch environment variable errors early with detailed validation messages
- 🔌 **Plugin System**: Extensible plugin architecture for Next.js configuration
- 📝 **Development Feedback**: Clear console output of validated environment variables during development
- 🎯 **TypeScript First**: Full TypeScript support with comprehensive type definitions
- 🚀 **Zero Runtime Overhead**: Minimal impact on production builds

## Installation

```bash
# Using npm
npm install --save @hyperse/next-config

# Using yarn
yarn add @hyperse/next-config

# Using pnpm
pnpm add @hyperse/next-config
```

## API Reference

### `createNextConfig`

Creates a normalized Next.js configuration by applying a series of plugins.

```typescript
import { createNextConfig } from '@hyperse/next-config';

const config = createNextConfig(
  {
    // Your initial Next.js config
    reactStrictMode: true,
  },
  [
    // Array of plugins that transform the config
    (config) => ({
      ...config,
      // Add your modifications
    }),
  ]
);

export default config;
```

### `createNextConfigEnv`

Validates and type-checks environment variables using Zod schemas.

```typescript
import { createNextConfigEnv } from '@hyperse/next-config';
import { z } from 'zod/v4';

// Define your environment variable schema
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  API_KEY: z.string().min(32),
  PORT: z.string().optional(),
});

// Validate and get typed environment variables
const env = createNextConfigEnv(envSchema);

// Now you have type-safe access to your env vars
const dbUrl = env.DATABASE_URL; // Type: string
const port = env.PORT; // Type: string | undefined
```

### Example Usage

Here's a complete example showing how to use both features together:

```typescript
// next.config.mjs
import { createNextConfig, createNextConfigEnv } from '@hyperse/next-config';
import { z } from 'zod/v4';

// Define and validate environment variables
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
});

const env = createNextConfigEnv(envSchema);

// Create Next.js config with plugins
const config = createNextConfig(
  {
    // Base config
    reactStrictMode: true,
    env: {
      // Access validated env vars
      NEXT_PUBLIC_API_URL: env.NEXT_PUBLIC_API_URL,
    },
  },
  [
    // Add your custom plugins
    (config) => ({
      ...config,
      // Your customizations
    }),
  ]
);

export default config;
```

## License

MIT © [Hyperse](https://github.com/hyperse-io)
