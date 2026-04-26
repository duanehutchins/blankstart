/** Ensures JSON export envelope includes required metadata fields. */
import { describe, expect, it } from 'vitest';
import { buildLeadEnvelope } from './exportJson';

describe('buildLeadEnvelope', () => {
  it('wraps records with schema and counts', () => {
    const payload = buildLeadEnvelope([]);
    expect(payload.schemaVersion).toBe('1.0.0');
    expect(payload.recordCount).toBe(0);
    expect(Array.isArray(payload.records)).toBe(true);
    expect(payload.exportedAt).toMatch(/T/);
  });
});
