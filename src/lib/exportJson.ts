/**
 * Creates JSON export envelopes for lead records with schema metadata.
 */
import type { ExportEnvelope, Lead } from '../types';
import { SCHEMA_VERSION } from './storage';
import { nowIso, timestampForFile } from './time';

/** Wraps lead records in a versioned export envelope. */
export function buildLeadEnvelope(leads: Lead[]): ExportEnvelope<Lead> {
  return {
    schemaVersion: SCHEMA_VERSION,
    exportedAt: nowIso(),
    recordCount: leads.length,
    records: leads,
  };
}

/** Triggers browser download of lead export JSON. */
export function downloadLeadsJson(leads: Lead[]): void {
  const payload = JSON.stringify(buildLeadEnvelope(leads), null, 2);
  const blob = new Blob([payload], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `xerge-leads-${timestampForFile()}.json`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
