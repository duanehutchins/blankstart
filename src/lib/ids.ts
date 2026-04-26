/**
 * Provides locally unique ID helpers for lead and session records.
 */

/** Creates a simple unique identifier suitable for local-only records. */
export function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
