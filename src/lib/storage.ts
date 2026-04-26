/**
 * Wraps LocalStorage access with schema checks and corruption protection.
 * Prevents runtime crashes and centralizes persistence logic.
 */
import type { AppAnalytics, Lead, StorageSnapshot } from '../types';

const STORAGE_KEY = 'xerge.expo.storage';
export const SCHEMA_VERSION = '1.0.0';

export interface StorageStatus {
  available: boolean;
  message: string;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function resolveStorage(override?: StorageLike): StorageLike | null {
  if (override) return override;
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

function defaultSnapshot(): StorageSnapshot {
  return {
    schemaVersion: SCHEMA_VERSION,
    leads: [],
    analytics: { completedSessions: [] },
  };
}

/** Returns storage availability and a human-readable reason when unavailable. */
export function getStorageStatus(override?: StorageLike): StorageStatus {
  const storage = resolveStorage(override);
  if (!storage) {
    return { available: false, message: 'LocalStorage unavailable in this environment.' };
  }

  try {
    const probeKey = `${STORAGE_KEY}.probe`;
    storage.setItem(probeKey, 'ok');
    storage.removeItem(probeKey);
    return { available: true, message: 'LocalStorage available.' };
  } catch {
    return { available: false, message: 'LocalStorage exists but write access is blocked.' };
  }
}

/** Loads storage data safely and self-heals to defaults if payload is missing or corrupted. */
export function loadSnapshot(override?: StorageLike): StorageSnapshot {
  const storage = resolveStorage(override);
  if (!storage) return defaultSnapshot();

  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return defaultSnapshot();

    const parsed = JSON.parse(raw) as Partial<StorageSnapshot>;
    if (parsed.schemaVersion !== SCHEMA_VERSION || !Array.isArray(parsed.leads) || !parsed.analytics || !Array.isArray(parsed.analytics.completedSessions)) {
      return defaultSnapshot();
    }

    return {
      schemaVersion: SCHEMA_VERSION,
      leads: parsed.leads,
      analytics: parsed.analytics as AppAnalytics,
    };
  } catch {
    return defaultSnapshot();
  }
}

/** Persists the entire snapshot atomically. */
export function saveSnapshot(snapshot: StorageSnapshot, override?: StorageLike): boolean {
  const storage = resolveStorage(override);
  if (!storage) return false;

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    return true;
  } catch {
    return false;
  }
}

/** Adds one lead to persistent storage while preserving existing analytics. */
export function appendLead(lead: Lead, override?: StorageLike): boolean {
  const current = loadSnapshot(override);
  current.leads.push(lead);
  return saveSnapshot(current, override);
}

/** Adds one completed session record for reporting. */
export function appendCompletedSession(session: AppAnalytics['completedSessions'][number], override?: StorageLike): boolean {
  const current = loadSnapshot(override);
  current.analytics.completedSessions.push(session);
  return saveSnapshot(current, override);
}

/** Clears stored leads while retaining quiz analytics. */
export function clearLeads(override?: StorageLike): boolean {
  const current = loadSnapshot(override);
  current.leads = [];
  return saveSnapshot(current, override);
}
