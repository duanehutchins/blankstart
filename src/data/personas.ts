/**
 * Contains persona ranges and messaging used to interpret deterministic quiz scores.
 */
import type { Persona } from '../types';

export const personas: Persona[] = [
  {
    id: 'rebuild-magnet',
    name: 'Rebuild Magnet',
    minScore: 5,
    maxScore: 9,
    summary: 'You move fast, but key technical decisions are likely creating expensive rework.',
    riskProfile: 'High risk of avoidable rebuilds, unstable releases, and investor concern over execution discipline.',
    nextStep: 'Establish decision guardrails and architecture checkpoints before your next major sprint.',
    xergeBridge:
      'What your answers suggest: speed-first instincts without sufficient technical governance. What usually breaks next: delivery stalls, reliability incidents, and repeated rewrites. How Xerge helps now: a Startup Tech Blueprint with fractional CTO stewardship to stabilize direction while keeping momentum.',
  },
  {
    id: 'feature-sprinter',
    name: 'Feature Sprinter',
    minScore: 10,
    maxScore: 14,
    summary: 'You can ship features quickly, but reliability and sequencing discipline are inconsistent.',
    riskProfile: 'Moderate risk of short-term wins causing medium-term quality and velocity erosion.',
    nextStep: 'Adopt a balanced roadmap that pairs feature delivery with recurring reliability and debt investment.',
    xergeBridge:
      'What your answers suggest: strong product push with uneven technical pacing. What usually breaks next: outages and debt drag reduce launch speed. How Xerge helps now: AI-accelerated delivery with senior sequencing and execution oversight.',
  },
  {
    id: 'almost-technical-founder',
    name: 'Almost Technical Founder',
    minScore: 15,
    maxScore: 18,
    summary: 'You make many sound calls and understand tradeoffs, but a few gaps can still compound under growth.',
    riskProfile: 'Moderate-low risk, mostly around scaling governance and consistency across teams.',
    nextStep: 'Codify repeatable operating principles and tighten review standards across architecture and AI workflows.',
    xergeBridge:
      'What your answers suggest: strong instincts with occasional execution variance. What usually breaks next: inconsistent team decisions as complexity rises. How Xerge helps now: fractional CTO guidance plus hands-on engineering execution to lock in repeatable outcomes.',
  },
  {
    id: 'startup-systems-thinker',
    name: 'Startup Systems Thinker',
    minScore: 19,
    maxScore: 22,
    summary: 'You consistently think in systems, balancing speed, reliability, and runway realities.',
    riskProfile: 'Low risk profile, with primary risk being bandwidth limits as strategic complexity grows.',
    nextStep: 'Scale your decision quality through better instrumentation, delegation, and operating cadence.',
    xergeBridge:
      'What your answers suggest: mature startup engineering judgment. What usually breaks next: founder bandwidth and organizational alignment. How Xerge helps now: extend leadership capacity through blueprinting, fractional CTO stewardship, and execution leverage.',
  },
  {
    id: 'ai-cto-material',
    name: 'AI CTO Material',
    minScore: 23,
    maxScore: 25,
    summary: 'You show strong strategic and technical judgment with pragmatic AI usage.',
    riskProfile: 'Low technical strategy risk; greatest risk is scaling this quality across every decision-maker.',
    nextStep: 'Formalize your playbook and turn it into an operating system your whole team can execute.',
    xergeBridge:
      'What your answers suggest: high-quality CTO-level reasoning. What usually breaks next: execution bottlenecks when only one person can decide well. How Xerge helps now: augment your leadership with Xerge’s blueprint process and AI-accelerated delivery engine.',
  },
];
