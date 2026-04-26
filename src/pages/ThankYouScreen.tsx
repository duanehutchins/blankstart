/**
 * Displays completion confirmation and countdown before booth auto-reset.
 */
import { useEffect, useState } from 'react';

interface ThankYouScreenProps {
  resetAfterSeconds: number;
  onResetNow: () => void;
}

export function ThankYouScreen({ resetAfterSeconds, onResetNow }: ThankYouScreenProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(resetAfterSeconds);

  useEffect(() => {
    setSecondsRemaining(resetAfterSeconds);
    const interval = window.setInterval(() => {
      setSecondsRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [resetAfterSeconds]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <section className="rounded-2xl border border-emerald-500/40 bg-slate-900/80 p-10">
        <h1 className="text-3xl font-bold text-white">Thanks — you’re all set.</h1>
        <p className="mt-3 text-slate-200">Your responses are saved on this device for export by the Xerge team.</p>
        <p className="mt-3 text-slate-300">Resetting for next visitor in {secondsRemaining}s.</p>
      </section>
      <button
        type="button"
        onClick={onResetNow}
        className="min-h-12 rounded-xl border border-slate-500 px-5 py-2 font-medium text-slate-200 hover:border-slate-300 focus-visible:outline-2 focus-visible:outline-cyan-300"
      >
        Reset Now
      </button>
    </main>
  );
}
