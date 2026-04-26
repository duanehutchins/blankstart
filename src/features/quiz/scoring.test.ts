/** Verifies deterministic score totals and persona mapping ranges. */
import { describe, expect, it } from 'vitest';
import { mapScoreToPersona, computeTotalScore } from './scoring';

describe('scoring', () => {
  it('computes total score', () => {
    expect(
      computeTotalScore([
        { questionId: 'q1', optionId: 'o1', score: 5, answeredAt: 't' },
        { questionId: 'q2', optionId: 'o2', score: 4, answeredAt: 't' },
      ]),
    ).toBe(9);
  });

  it('maps score to persona deterministically', () => {
    expect(mapScoreToPersona(8).name).toBe('Rebuild Magnet');
    expect(mapScoreToPersona(24).name).toBe('AI CTO Material');
  });
});
