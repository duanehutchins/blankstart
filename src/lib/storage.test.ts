/** Tests storage wrapper behavior for healthy and corrupted payload scenarios. */
import { describe, expect, it } from 'vitest';
import { appendLead, clearLeads, loadSnapshot, type StorageLike } from './storage';

function createMemoryStorage(initial: Record<string, string> = {}): StorageLike {
  const map = new Map(Object.entries(initial));
  return {
    getItem(key) {
      return map.has(key) ? map.get(key)! : null;
    },
    setItem(key, value) {
      map.set(key, value);
    },
    removeItem(key) {
      map.delete(key);
    },
  };
}

describe('storage', () => {
  it('falls back to defaults when payload is corrupted', () => {
    const store = createMemoryStorage({ 'xerge.expo.storage': '{bad json' });
    const snapshot = loadSnapshot(store);
    expect(snapshot.leads).toHaveLength(0);
    expect(snapshot.analytics.completedSessions).toHaveLength(0);
  });

  it('appends and clears leads', () => {
    const store = createMemoryStorage();
    appendLead(
      {
        id: 'lead-1',
        name: 'Pat',
        email: 'pat@example.com',
        consent: true,
        consentVersion: 'v1',
        capturedAt: '2026-01-01T00:00:00.000Z',
        personaId: 'p1',
        personaName: 'Persona',
        score: 20,
      },
      store,
    );
    expect(loadSnapshot(store).leads).toHaveLength(1);
    clearLeads(store);
    expect(loadSnapshot(store).leads).toHaveLength(0);
  });
});
