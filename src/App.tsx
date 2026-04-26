/**
 * Orchestrates route-level flow for quiz, results, lead capture, thank-you, and admin controls.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { questions } from './data/questions';
import { CONSENT_VERSION, INACTIVITY_SECONDS, RESET_SECONDS } from './data/copy';
import { buildAnswer, computeTotalScore, mapScoreToPersona } from './features/quiz/scoring';
import { appendCompletedSession, appendLead, clearLeads, getStorageStatus, loadSnapshot } from './lib/storage';
import { createId } from './lib/ids';
import { nowIso } from './lib/time';
import { downloadLeadsCsv } from './lib/exportCsv';
import { downloadLeadsJson } from './lib/exportJson';
import { AdminScreen } from './pages/AdminScreen';
import { IdleScreen } from './pages/IdleScreen';
import { LeadCaptureScreen } from './pages/LeadCaptureScreen';
import { QuizScreen } from './pages/QuizScreen';
import { ResultScreen } from './pages/ResultScreen';
import { ThankYouScreen } from './pages/ThankYouScreen';
import type { Answer, Lead, QuizSession } from './types';

interface ActiveState {
  screen: 'idle' | 'quiz' | 'result' | 'lead' | 'thankyou';
  quizIndex: number;
  answers: Answer[];
  startedAt: string;
}

const initialState: ActiveState = {
  screen: 'idle',
  quizIndex: 0,
  answers: [],
  startedAt: nowIso(),
};

function App() {
  const [active, setActive] = useState<ActiveState>(initialState);
  const [leads, setLeads] = useState(() => loadSnapshot().leads);
  const [sessions, setSessions] = useState<QuizSession[]>(() => loadSnapshot().analytics.completedSessions);
  const location = useLocation();
  const navigate = useNavigate();

  const hardResetToIdle = useCallback(() => {
    setActive({ ...initialState, startedAt: nowIso() });
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const openAdminShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName.toLowerCase();
      const isFormField = tagName === 'input' || tagName === 'textarea' || tagName === 'select';
      const isEditable = target?.isContentEditable ?? false;

      if (isFormField || isEditable) return;

      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', openAdminShortcut);
    return () => window.removeEventListener('keydown', openAdminShortcut);
  }, [navigate]);

  useEffect(() => {
    if (location.pathname === '/admin') return;

    let inactivityTimer = window.setTimeout(() => {
      hardResetToIdle();
    }, INACTIVITY_SECONDS * 1000);

    const refreshTimer = () => {
      window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => hardResetToIdle(), INACTIVITY_SECONDS * 1000);
    };

    window.addEventListener('mousemove', refreshTimer);
    window.addEventListener('keydown', refreshTimer);
    window.addEventListener('click', refreshTimer);

    return () => {
      window.clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', refreshTimer);
      window.removeEventListener('keydown', refreshTimer);
      window.removeEventListener('click', refreshTimer);
    };
  }, [location.pathname, hardResetToIdle]);

  useEffect(() => {
    if (active.screen !== 'thankyou') return;

    const reset = window.setTimeout(() => {
      hardResetToIdle();
    }, RESET_SECONDS * 1000);

    return () => {
      window.clearTimeout(reset);
    };
  }, [active.screen, hardResetToIdle]);

  const totalScore = useMemo(() => computeTotalScore(active.answers), [active.answers]);
  const persona = useMemo(() => mapScoreToPersona(totalScore), [totalScore]);

  const startChallenge = () => {
    setActive({ screen: 'quiz', quizIndex: 0, answers: [], startedAt: nowIso() });
    navigate('/');
  };

  const onSelectOption = (optionId: string) => {
    const question = questions[active.quizIndex];
    if (!question) return;

    const answer = buildAnswer(question, optionId, nowIso());
    const nextAnswers = [...active.answers, answer];
    const nextIndex = active.quizIndex + 1;

    if (nextIndex >= questions.length) {
      const score = computeTotalScore(nextAnswers);
      const resolvedPersona = mapScoreToPersona(score);
      const completedSession: QuizSession = {
        sessionId: createId('session'),
        startedAt: active.startedAt,
        completedAt: nowIso(),
        answers: nextAnswers,
        totalScore: score,
        personaId: resolvedPersona.id,
      };
      appendCompletedSession(completedSession);
      setSessions((current) => [...current, completedSession]);
      setActive((current) => ({ ...current, answers: nextAnswers, quizIndex: nextIndex, screen: 'result' }));
      return;
    }

    setActive((current) => ({ ...current, answers: nextAnswers, quizIndex: nextIndex }));
  };

  const submitLead = (payload: { name: string; email: string; company: string; role: string; challenge: string; consent: boolean }) => {
    const lead: Lead = {
      id: createId('lead'),
      name: payload.name.trim(),
      email: payload.email.trim(),
      company: payload.company.trim() || undefined,
      role: payload.role.trim() || undefined,
      challenge: payload.challenge.trim() || undefined,
      consent: payload.consent,
      consentVersion: CONSENT_VERSION,
      capturedAt: nowIso(),
      personaId: persona.id,
      personaName: persona.name,
      score: totalScore,
    };

    appendLead(lead);
    setLeads((current) => [...current, lead]);
    setActive((current) => ({ ...current, screen: 'thankyou' }));
  };

  const clearAllLeads = () => {
    const exported = window.confirm('Have you exported CSV/JSON?');
    if (!exported) return;

    const ok = window.confirm('Clear all leads? This cannot be undone on this device.');
    if (!ok) return;
    clearLeads();
    setLeads([]);
  };

  const activeQuestion = questions[Math.min(active.quizIndex, questions.length - 1)];

  const renderMain = () => {
    if (active.screen === 'idle') return <IdleScreen onStart={startChallenge} />;
    if (active.screen === 'quiz') return <QuizScreen question={activeQuestion} index={active.quizIndex} total={questions.length} onSelect={onSelectOption} />;
    if (active.screen === 'result') {
      return (
        <ResultScreen
          score={totalScore}
          persona={persona}
          explanations={questions.map((question) => question.explanation)}
          onContinue={() => setActive((current) => ({ ...current, screen: 'lead' }))}
        />
      );
    }
    if (active.screen === 'lead') return <LeadCaptureScreen onSubmit={submitLead} />;
    return <ThankYouScreen resetAfterSeconds={RESET_SECONDS} onResetNow={hardResetToIdle} />;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 border-b border-slate-800 bg-slate-950/90 px-6 py-3 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between text-sm">
          <span className="font-semibold text-cyan-300">Xerge Expo Demo</span>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-slate-300 hover:text-white">Challenge</Link>
            <Link to="/admin" className="text-slate-300 hover:text-white">Admin</Link>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={renderMain()} />
        <Route
          path="/admin"
          element={
            <AdminScreen
              leads={leads}
              sessions={sessions}
              storageStatus={getStorageStatus()}
              onExportCsv={() => downloadLeadsCsv(leads)}
              onExportJson={() => downloadLeadsJson(leads)}
              onClearLeads={clearAllLeads}
              onResetActive={hardResetToIdle}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
