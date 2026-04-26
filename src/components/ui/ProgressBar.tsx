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
    <div aria-label={`Question ${current} of ${total}`} className="w-full">
      <div className="mb-2 text-sm font-medium text-slate-300">Question {current} of {total}</div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-3 w-full overflow-hidden rounded-full bg-slate-700"
      >
        <div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
