/** Validates CSV escaping and header generation for lead exports. */
import { describe, expect, it } from 'vitest';
import { buildLeadsCsv } from './exportCsv';

describe('buildLeadsCsv', () => {
  it('escapes commas, quotes, and line breaks', () => {
    const csv = buildLeadsCsv([
      {
        id: '1',
        name: 'Jane "JJ" Doe',
        email: 'jane@example.com',
        company: 'Acme, Inc.',
        role: 'CEO',
        challenge: 'Line 1\nLine 2',
        consent: true,
        consentVersion: 'v1',
        capturedAt: '2026-01-01T00:00:00.000Z',
        personaId: 'p1',
        personaName: 'Persona',
        score: 22,
      },
    ]);

    expect(csv).toContain('"Acme, Inc."');
    expect(csv).toContain('"Jane ""JJ"" Doe"');
    expect(csv).toContain('"Line 1\nLine 2"');
  });
});
