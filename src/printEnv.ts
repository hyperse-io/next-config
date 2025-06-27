import picocolors from 'picocolors';
import type { core, ZodType } from 'zod/v4';
import { type ZodSafeParseSuccess } from 'zod/v4';

/**
 * Prints the validated environment variables to the console
 * @param section The section name of the environment variables to print
 * @param zodSafeParseSuccess The successful parse result containing validated env vars
 */
export const printEnv = <T extends ZodType>(
  section: string,
  zodSafeParseSuccess: ZodSafeParseSuccess<core.output<T>>
) => {
  const prefix = picocolors.cyan('- info'.padEnd(7));
  console.info(prefix.concat(`${section} validation successful:`));
  for (const [key, value] of Object.entries(
    zodSafeParseSuccess.data as Record<string, unknown>
  )) {
    console.info(prefix.concat(`${key}=${value}`));
  }
};
