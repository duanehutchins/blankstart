/**
 * Presents the attract-mode landing screen used between booth visitors.
 */
import { APP_SUBTITLE, APP_TITLE } from '../data/copy';

interface IdleScreenProps {
  onStart: () => void;
}

export function IdleScreen({ onStart }: IdleScreenProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 px-6 text-center">
      <div className="rounded-2xl border border-cyan-400/30 bg-slate-900/80 p-10 shadow-2xl shadow-cyan-500/10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Xerge Expo Challenge</p>
        <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">{APP_TITLE}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-200">{APP_SUBTITLE}</p>
        <button
          type="button"
          onClick={onStart}
          className="mt-8 inline-flex min-h-14 items-center justify-center rounded-xl bg-cyan-400 px-8 text-lg font-semibold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          Start Challenge
        </button>
      </div>
      <p className="text-sm text-slate-400">Tip: press <kbd className="rounded bg-slate-800 px-1 py-0.5">A</kbd> to open admin/export.</p>
    </main>
  );
}
