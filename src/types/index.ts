/**
 * Defines shared domain types for quiz content, session analytics, and lead capture records.
 * Keeps the app strongly typed and avoids leaking business rules into UI components.
 */
export interface Option { id: string; label: string; score: number; }
export interface Question { id: string; theme: string; prompt: string; scenario: string; options: Option[]; bestOptionId: string; explanation: string; }
export interface Answer { questionId: string; optionId: string; score: number; answeredAt: string; }
export interface QuizSession { sessionId: string; startedAt: string; completedAt: string; answers: Answer[]; totalScore: number; personaId: string; }
export interface Persona { id: string; name: string; minScore: number; maxScore: number; summary: string; riskProfile: string; nextStep: string; xergeBridge: string; }
export interface Lead { id: string; name: string; email: string; company?: string; role?: string; challenge?: string; consent: boolean; consentVersion: string; capturedAt: string; personaId: string; personaName: string; score: number; }
export interface ExportEnvelope<T> { schemaVersion: string; exportedAt: string; recordCount: number; records: T[]; }
export interface AppAnalytics { completedSessions: QuizSession[]; }
export interface StorageSnapshot { schemaVersion: string; leads: Lead[]; analytics: AppAnalytics; }
