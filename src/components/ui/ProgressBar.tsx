/**
 * Renders a simple accessible progress bar for quiz completion state.
 */
interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="mb-2 text-sm font-medium text-slate-300">Question {current} of {total}</div>
      <div
        aria-label={`Question ${current} of ${total}`}
        aria-valuemax={total}
        aria-valuemin={0}
        aria-valuenow={current}
        className="h-3 w-full overflow-hidden rounded-full bg-slate-700"
        role="progressbar"
      >
        <div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
