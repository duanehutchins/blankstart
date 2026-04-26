/**
 * Generates robust CSV output with proper escaping for commas, quotes, and newlines.
 */
import type { Lead } from '../types';
import { timestampForFile } from './time';

function escapeCsvCell(value: string): string {
  const escaped = value.replace(/"/g, '""');
  return /[",\n\r]/.test(escaped) ? `"${escaped}"` : escaped;
}

/** Builds a CSV document from lead records with deterministic column ordering. */
export function buildLeadsCsv(leads: Lead[]): string {
  const headers = ['id', 'name', 'email', 'company', 'role', 'challenge', 'consent', 'consentVersion', 'capturedAt', 'personaId', 'personaName', 'score'];
  const rows = leads.map((lead) =>
    [
      lead.id,
      lead.name,
      lead.email,
      lead.company ?? '',
      lead.role ?? '',
      lead.challenge ?? '',
      String(lead.consent),
      lead.consentVersion,
      lead.capturedAt,
      lead.personaId,
      lead.personaName,
      String(lead.score),
    ]
      .map((cell) => escapeCsvCell(cell))
      .join(','),
  );

  return [headers.join(','), ...rows].join('\n');
}

/** Triggers browser download of lead data as CSV. */
export function downloadLeadsCsv(leads: Lead[]): void {
  const csv = buildLeadsCsv(leads);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `xerge-leads-${timestampForFile()}.csv`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
