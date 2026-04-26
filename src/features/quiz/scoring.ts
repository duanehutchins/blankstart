/**
 * Implements deterministic score aggregation and persona mapping.
 * Keeps scoring logic testable and independent from presentation components.
 */
import { personas } from '../../data/personas';
import type { Answer, Persona, Question } from './quizTypes';

/** Maps selected options to answer records while preserving timestamps for auditability. */
export function buildAnswer(question: Question, optionId: string, answeredAt: string): Answer {
  const option = question.options.find((candidate) => candidate.id === optionId);
  if (!option) {
    throw new Error(`Option ${optionId} does not exist for question ${question.id}.`);
  }

  return {
    questionId: question.id,
    optionId,
    score: option.score,
    answeredAt,
  };
}

/** Returns the numeric total score for a finished quiz. */
export function computeTotalScore(answers: Answer[]): number {
  return answers.reduce((sum, answer) => sum + answer.score, 0);
}

/** Resolves the matching persona based on inclusive score ranges. */
export function mapScoreToPersona(totalScore: number): Persona {
  const persona = personas.find((candidate) => totalScore >= candidate.minScore && totalScore <= candidate.maxScore);
  if (!persona) {
    throw new Error(`No persona configured for score ${totalScore}.`);
  }

  return persona;
}
