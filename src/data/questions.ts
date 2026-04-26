/**
 * Defines the five fixed quiz questions used for the booth challenge.
 * Questions focus on realistic startup tradeoffs rather than trivia.
 */
import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'q1',
    theme: 'MVP architecture under uncertainty',
    prompt: 'You have 10 weeks of runway and need an MVP for enterprise pilots. What architecture call is smartest?',
    scenario: 'You can ship quickly now, but poor structure may force a full rebuild before paid expansion.',
    bestOptionId: 'q1o2',
    explanation:
      'The best move is thin modular boundaries with one primary stack. It protects speed now while preserving a path to scale. Xerge applies this exact balance in startup blueprints.',
    options: [
      { id: 'q1o1', label: 'Build fast with no boundaries; clean it up after fundraising.', score: 1 },
      { id: 'q1o2', label: 'Use one stack with clear domain boundaries and observability basics.', score: 5 },
      { id: 'q1o3', label: 'Over-engineer microservices from day one for future scale.', score: 2 },
      { id: 'q1o4', label: 'Outsource architecture decisions fully to AI prompts.', score: 1 },
    ],
  },
  {
    id: 'q2',
    theme: 'AI-generated code: trust vs review',
    prompt: 'Your team is generating 40% of code with AI assistants. What policy keeps momentum and quality?',
    scenario: 'Bugs and security gaps are rising, but team speed is noticeably better.',
    bestOptionId: 'q2o3',
    explanation:
      'Senior teams keep AI velocity but set guardrails: reviews, test expectations, and architecture ownership. Xerge helps founders use AI output safely without slowing execution.',
    options: [
      { id: 'q2o1', label: 'Merge AI code quickly unless the app crashes in staging.', score: 1 },
      { id: 'q2o2', label: 'Ban AI-generated code to avoid risks entirely.', score: 2 },
      { id: 'q2o3', label: 'Require review, tests, and architecture checks on AI-generated changes.', score: 5 },
      { id: 'q2o4', label: 'Only review UI code; backend and infra can be trusted to AI.', score: 1 },
    ],
  },
  {
    id: 'q3',
    theme: 'Build vs buy under runway constraints',
    prompt: 'You need billing, auth, and analytics. Cash is tight. What do you do?',
    scenario: 'Building everything in-house gives control, but costs engineering cycles you may not recover.',
    bestOptionId: 'q3o2',
    explanation:
      'Strategic founders buy commodity capabilities and focus custom build on product differentiation. Xerge guides this decision so runway is spent on leverage, not ego architecture.',
    options: [
      { id: 'q3o1', label: 'Build all three in-house to avoid vendor lock-in.', score: 1 },
      { id: 'q3o2', label: 'Buy commodity pieces, build only what differentiates your core product.', score: 5 },
      { id: 'q3o3', label: 'Let AI generate your own auth and billing stack from scratch.', score: 1 },
      { id: 'q3o4', label: 'Delay all decisions until after first enterprise contract.', score: 2 },
    ],
  },
  {
    id: 'q4',
    theme: 'Reliability vs shipping velocity',
    prompt: 'Pilot users are growing and outages are increasing. What is the right next move?',
    scenario: 'Sales wants features; support wants reliability. You can only fund one short sprint focus.',
    bestOptionId: 'q4o1',
    explanation:
      'A reliability stabilization sprint with clear SLOs and incident discipline protects trust and future growth. Xerge helps startups sequence this without freezing delivery.',
    options: [
      { id: 'q4o1', label: 'Run a focused reliability sprint with SLO targets, then resume roadmap.', score: 5 },
      { id: 'q4o2', label: 'Ignore outages for now and ship visible features to impress prospects.', score: 1 },
      { id: 'q4o3', label: 'Rewrite the platform immediately before fixing the incidents.', score: 2 },
      { id: 'q4o4', label: 'Ask AI to auto-patch production without process changes.', score: 1 },
    ],
  },
  {
    id: 'q5',
    theme: 'Technical debt sequencing',
    prompt: 'Your backlog has debt, growth asks, and security gaps. How do you sequence?',
    scenario: 'You can’t clear everything this quarter, and random prioritization is creating churn.',
    bestOptionId: 'q5o3',
    explanation:
      'The winning pattern ranks debt by business risk and delivery drag, then allocates a fixed capacity band. Xerge applies this governance so teams scale predictably.',
    options: [
      { id: 'q5o1', label: 'Tackle debt only when engineers complain loudly enough.', score: 1 },
      { id: 'q5o2', label: 'Pause all roadmap work until all debt is fully paid down.', score: 2 },
      { id: 'q5o3', label: 'Prioritize by risk and drag, reserving recurring capacity every sprint.', score: 5 },
      { id: 'q5o4', label: 'Use AI to auto-refactor everything in one massive PR.', score: 1 },
    ],
  },
];
