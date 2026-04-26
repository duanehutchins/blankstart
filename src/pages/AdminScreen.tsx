/**
 * Provides booth operator controls for export, reset, and lightweight storage diagnostics.
 */
import type { Lead, QuizSession } from '../types';
import type { StorageStatus } from '../lib/storage';

interface AdminScreenProps {
  leads: Lead[];
  sessions: QuizSession[];
  storageStatus: StorageStatus;
  onExportCsv: () => void;
  onExportJson: () => void;
  onClearLeads: () => void;
  onResetActive: () => void;
}

export function AdminScreen({ leads, sessions, storageStatus, onExportCsv, onExportJson, onClearLeads, onResetActive }: AdminScreenProps) {
  const avgScore = sessions.length === 0 ? 0 : Math.round((sessions.reduce((sum, s) => sum + s.totalScore, 0) / sessions.length) * 10) / 10;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-6 py-10">
      <h1 className="text-3xl font-bold text-white">Admin & Export</h1>
      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total Leads" value={String(leads.length)} />
        <StatCard label="Completed Sessions" value={String(sessions.length)} />
        <StatCard label="Average Score" value={String(avgScore)} />
        <StatCard label="Storage" value={storageStatus.available ? 'Healthy' : 'Limited'} description={storageStatus.message} />
      </section>

      <section className="flex flex-wrap gap-3">
        <button type="button" onClick={onExportCsv} className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950">Export CSV</button>
        <button type="button" onClick={onExportJson} className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950">Export JSON</button>
        <button type="button" onClick={onResetActive} className="rounded-lg border border-slate-500 px-4 py-2 text-slate-200">Reset Active Session</button>
        <button
          type="button"
          onClick={onClearLeads}
          className="rounded-lg border border-red-400 px-4 py-2 text-red-200"
        >
          Clear Leads (Confirm)
        </button>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
        <h2 className="mb-3 text-xl font-semibold text-white">Lead Preview</h2>
        <div className="overflow-auto">
          <table className="min-w-full text-left text-sm text-slate-200">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Company</th>
                <th className="p-2">Persona</th>
                <th className="p-2">Captured</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-800">
                  <td className="p-2">{lead.name}</td>
                  <td className="p-2">{lead.email}</td>
                  <td className="p-2">{lead.company || '—'}</td>
                  <td className="p-2">{lead.personaName}</td>
                  <td className="p-2">{new Date(lead.capturedAt).toLocaleString()}</td>
                </tr>
              ))}
              {leads.length === 0 ? (
                <tr>
                  <td className="p-2 text-slate-400" colSpan={5}>No leads captured yet.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value, description }: { label: string; value: string; description?: string }) {
  return (
    <article className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      {description ? <p className="mt-2 text-xs text-slate-400">{description}</p> : null}
    </article>
  );
}
