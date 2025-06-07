import picocolors from 'picocolors';
import { type SafeParseSuccess } from 'zod';

/**
 * Prints the validated environment variables to the console
 * @param section The section name of the environment variables to print
 * @param zodSafeParseSuccess The successful parse result containing validated env vars
 */
export const printEnv = (
  section: string,
  zodSafeParseSuccess: SafeParseSuccess<Record<string, unknown>>
) => {
  const prefix = picocolors.cyan('- info'.padEnd(7));
  console.info(prefix.concat(`${section} validation successful:`));
  for (const [key, value] of Object.entries(zodSafeParseSuccess.data)) {
    console.info(prefix.concat(`${key}=${value}`));
  }
};
