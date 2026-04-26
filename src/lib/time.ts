/**
 * Centralizes date-time generation and file-safe timestamp formatting.
 */

/** Returns the current ISO timestamp. */
export function nowIso(): string {
  return new Date().toISOString();
}

/** Formats a date into a compact UTC suffix for export filenames. */
export function timestampForFile(date = new Date()): string {
  const pad = (value: number) => value.toString().padStart(2, '0');
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}-${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}`;
}
