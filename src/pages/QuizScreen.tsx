/**
 * Displays one quiz question at a time with large touch-friendly response buttons.
 */
import type { Question } from '../types';
import { ProgressBar } from '../components/ui/ProgressBar';

interface QuizScreenProps {
  question: Question;
  index: number;
  total: number;
  onSelect: (optionId: string) => void;
}

export function QuizScreen({ question, index, total, onSelect }: QuizScreenProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center gap-8 px-6 py-10">
      <ProgressBar current={index + 1} total={total} />
      <section className="rounded-2xl border border-slate-700 bg-slate-900/80 p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">{question.theme}</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">{question.prompt}</h2>
        <p className="mt-3 text-base text-slate-300">{question.scenario}</p>
        <div className="mt-6 grid gap-4">
          {question.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className="min-h-16 rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-left text-base text-slate-100 transition hover:border-cyan-300 hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
