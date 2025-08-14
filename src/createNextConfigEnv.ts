import type { ZodObject } from 'zod';
import type z from 'zod';
import { treeifyError } from 'zod';
import { printEnv } from './printEnv.js';

/**
 * The utility used to get validated environment variables for next build & dev from next.config.mjs
 * @example
 * ```ts
 * const env = createNextConfigEnv(z.object({ PORT: z.string().optional() }));
 * env.PORT; // string | undefined
 * ```
 * @returns The validated environment variables
 */
export const createNextConfigEnv = <T extends ZodObject>(
  zodSchema: T,
  myEnv?: Record<string, string | undefined>
): z.infer<T> => {
  const parsedEnv = zodSchema.safeParse(myEnv ?? process.env);

  if (!parsedEnv.success) {
    console.error(
      '❌ Invalid environment variables:',
      JSON.stringify(treeifyError(parsedEnv.error), null, 4)
    );
    process.exit(1);
  }

  printEnv(
    process.env.NODE_ENV === 'production' ? 'Build env(s)' : 'Server env(s)',
    parsedEnv
  );

  return parsedEnv.data;
};
