import { cyan } from 'picocolors';
import type { z, ZodSafeParseSuccess, ZodType } from 'zod';

/**
 * Prints the validated environment variables to the console
 * @param section The section name of the environment variables to print
 * @param zodSafeParseSuccess The successful parse result containing validated env vars
 */
export const printEnv = <T extends ZodType>(
  section: string,
  zodSafeParseSuccess: ZodSafeParseSuccess<z.output<T>>
) => {
  const prefix = cyan('- info'.padEnd(7));
  console.info(prefix.concat(`${section} validation successful:`));
  for (const [key, value] of Object.entries(
    zodSafeParseSuccess.data as Record<string, unknown>
  )) {
    console.info(prefix.concat(`${key}=${value}`));
  }
};
