/**
 * Shows persona outcome, score context, and bridge messaging to Xerge's offer.
 */
import { XERGE_BRIDGE_MESSAGE } from '../data/copy';
import type { Persona } from '../types';

interface ResultScreenProps {
  score: number;
  persona: Persona;
  explanations: string[];
  onContinue: () => void;
}

export function ResultScreen({ score, persona, explanations, onContinue }: ResultScreenProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center gap-6 px-6 py-10">
      <section className="rounded-2xl border border-cyan-500/40 bg-slate-900/80 p-8">
        <p className="text-sm uppercase tracking-wide text-cyan-300">Your result</p>
        <h1 className="mt-2 text-3xl font-bold text-white">{persona.name}</h1>
        <p className="mt-2 text-slate-200">Score: {score} / 25</p>
        <p className="mt-4 text-slate-100">{persona.summary}</p>
        <p className="mt-3 text-slate-300"><span className="font-semibold text-slate-100">Main risk:</span> {persona.riskProfile}</p>
        <p className="mt-3 text-slate-300"><span className="font-semibold text-slate-100">Practical next step:</span> {persona.nextStep}</p>
      </section>

      <section className="rounded-2xl border border-slate-700 bg-slate-900/80 p-8">
        <h2 className="text-xl font-semibold text-white">What your answers teach</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
          {explanations.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-emerald-500/30 bg-slate-900/80 p-8">
        <h2 className="text-xl font-semibold text-white">Xerge bridge</h2>
        <p className="mt-3 text-slate-100">{XERGE_BRIDGE_MESSAGE}</p>
        <p className="mt-3 text-slate-300">{persona.xergeBridge}</p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-300">
          <li>Startup Tech Blueprint</li>
          <li>AI-accelerated delivery</li>
          <li>Fractional CTO stewardship</li>
          <li>Hands-on engineering execution</li>
        </ul>
      </section>

      <button
        type="button"
        onClick={onContinue}
        className="min-h-14 rounded-xl bg-cyan-400 px-6 text-lg font-semibold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
      >
        Continue to Lead Capture
      </button>
    </main>
  );
}
