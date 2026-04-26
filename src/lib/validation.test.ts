/** Covers required lead form validation including explicit consent gating. */
import { describe, expect, it } from 'vitest';
import { validateLeadInput } from './validation';

describe('validateLeadInput', () => {
  it('returns errors for missing name, bad email, and consent', () => {
    const errors = validateLeadInput({ name: '', email: 'bad', consent: false });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.consent).toBeDefined();
  });

  it('passes valid input', () => {
    const errors = validateLeadInput({ name: 'Alex', email: 'alex@example.com', consent: true });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});
