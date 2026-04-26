/**
 * Collects consented lead details and enforces required fields before submission.
 */
import { useState } from 'react';
import { CONSENT_TEXT } from '../data/copy';
import { validateLeadInput } from '../lib/validation';

interface LeadCapturePayload {
  name: string;
  email: string;
  company: string;
  role: string;
  challenge: string;
  consent: boolean;
}

interface LeadCaptureScreenProps {
  onSubmit: (payload: LeadCapturePayload) => void;
}

export function LeadCaptureScreen({ onSubmit }: LeadCaptureScreenProps) {
  const [form, setForm] = useState<LeadCapturePayload>({
    name: '',
    email: '',
    company: '',
    role: '',
    challenge: '',
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validateLeadInput({ name: form.name, email: form.email, consent: form.consent });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSubmit(form);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-10">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-700 bg-slate-900/80 p-8">
        <h1 className="text-3xl font-bold text-white">Get your startup tech next-step plan</h1>
        <p className="mt-2 text-slate-300">Share your info and we’ll follow up with practical resources.</p>

        <div className="mt-6 grid gap-4">
          {[
            { key: 'name', label: 'Name', required: true },
            { key: 'email', label: 'Email', required: true, type: 'email' },
            { key: 'company', label: 'Company', required: false },
            { key: 'role', label: 'Role', required: false },
          ].map((field) => (
            <label key={field.key} className="text-sm text-slate-200">
              {field.label} {field.required ? '*' : ''}
              <input
                type={field.type ?? 'text'}
                value={form[field.key as keyof LeadCapturePayload] as string}
                onChange={(event) => setForm((prev) => ({ ...prev, [field.key]: event.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-3 text-base text-white focus-visible:outline-2 focus-visible:outline-cyan-300"
              />
              {errors[field.key] ? <span className="mt-1 block text-red-300">{errors[field.key]}</span> : null}
            </label>
          ))}

          <label className="text-sm text-slate-200">
            Current technical challenge (optional)
            <textarea
              value={form.challenge}
              onChange={(event) => setForm((prev) => ({ ...prev, challenge: event.target.value }))}
              rows={4}
              className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-3 text-base text-white focus-visible:outline-2 focus-visible:outline-cyan-300"
            />
          </label>

          <label className="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-800/80 p-3 text-sm text-slate-200">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(event) => setForm((prev) => ({ ...prev, consent: event.target.checked }))}
              className="mt-1 h-5 w-5 accent-cyan-400"
            />
            <span>{CONSENT_TEXT}</span>
          </label>
          {errors.consent ? <span className="text-red-300">{errors.consent}</span> : null}
        </div>

        <button
          type="submit"
          className="mt-6 min-h-14 w-full rounded-xl bg-cyan-400 px-5 text-lg font-semibold text-slate-950 hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-300"
        >
          Submit & Finish
        </button>
      </form>
    </main>
  );
}
