import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const requiredSignposts = [
  'README.md',
  'AGENTS.md',
  'src/README.md',
  'src/AGENTS.md',
  'docs/README.md',
  'docs/AGENTS.md',
  '.vibe/README.md',
  '.vibe/registry/README.md',
  '.vibe/compliance/README.md',
];
const requiredVibe = [
  '.vibe/config.yaml',
  '.vibe/registry/_index.yaml',
  '.vibe/registry/xerge-expo-demo.yaml',
  '.vibe/projects/xerge-expo-demo/plan.yaml',
  '.vibe/projects/xerge-expo-demo/packets/PKT-xerge-expo-demo-20260426-wayfinder-compliance.yaml',
  '.vibe/projects/xerge-expo-demo/reviews/PKT-xerge-expo-demo-20260426-wayfinder-compliance.gan.yaml',
  '.vibe/projects/xerge-expo-demo/outputs/PKT-xerge-expo-demo-20260426-wayfinder-compliance.checks.json',
  '.vibe/projects/xerge-expo-demo/handoffs/PKT-xerge-expo-demo-20260426-wayfinder-compliance.md',
];

function exists(relOrAbs) {
  const full = path.isAbsolute(relOrAbs) ? relOrAbs : path.join(root, relOrAbs);
  return fs.existsSync(full);
}
function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exitCode = 1;
}
function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

for (const file of requiredSignposts) if (!exists(file)) fail(`Missing signpost ${file}`);
for (const file of requiredVibe) if (!exists(file)) fail(`Missing .vibe artifact ${file}`);
if (!exists('repo_index.yaml')) fail('Missing repo_index.yaml');
if (!exists('docs/adr')) fail('Missing docs/adr directory');

const wfFiles = requiredSignposts;
for (const file of wfFiles) {
  const txt = read(file);
  const m = txt.match(/<!-- wayfinder:next([\s\S]*?)-->/);
  if (!m) {
    fail(`${file} missing wayfinder:next block`);
    continue;
  }

  const lines = m[1].split('\n').map((l) => l.trim()).filter(Boolean);
  const paths = lines
    .filter((l) => l.startsWith('- path:') || l.startsWith('path:'))
    .map((l) => l.split(':').slice(1).join(':').trim());
  if (paths.length === 0) fail(`${file} has empty wayfinder paths`);

  const baseDir = path.dirname(path.join(root, file));
  for (const relPath of paths) {
    const resolved = path.normalize(path.join(baseDir, relPath));
    if (!fs.existsSync(resolved)) {
      fail(`${file} points to missing relative path ${relPath}`);
    }
  }
}

const repoIndex = read('repo_index.yaml');
for (const req of ['repo:', 'required_signposts:', 'modules:', 'adr_directory:', 'vibe_project_path:', 'validation_commands:']) {
  if (!repoIndex.includes(req)) fail(`repo_index.yaml missing ${req}`);
}

const registryFile = '.vibe/registry/xerge-expo-demo.yaml';
const registry = read(registryFile);
for (const req of ['project_id:', 'owner:', 'status:', 'source_roots:', 'active_packets:', 'plan_path:']) {
  if (!registry.includes(req)) fail(`registry file missing ${req}`);
}
const planMatch = registry.match(/plan_path:\s*(.+)/);
if (!planMatch) fail('registry missing plan_path value');
else if (!exists(planMatch[1].trim())) fail(`registry plan_path target missing ${planMatch[1].trim()}`);

const plan = read('.vibe/projects/xerge-expo-demo/plan.yaml');
for (const req of ['project_id:', 'intent:', 'non_goals:', 'deliverables:', 'dependencies:', 'packet_plan:', 'gan_policy:', 'status:']) {
  if (!plan.includes(req)) fail(`plan.yaml missing ${req}`);
}

const packet = read('.vibe/projects/xerge-expo-demo/packets/PKT-xerge-expo-demo-20260426-wayfinder-compliance.yaml');
for (const req of ['packet_id:', 'project_id:', 'title:', 'status:', 'complexity_tier:', 'intent:', 'must_not:', 'read_first:', 'allowed_read_paths:', 'allowed_write_paths:', 'forbidden_paths:', 'local_context_files:', 'constraints:', 'acceptance_criteria:', 'commands_to_run:', 'docs_to_update:', 'rollback_notes:', 'completion_definition:', 'max_context_tokens:']) {
  if (!packet.includes(req)) fail(`packet missing ${req}`);
}

const gan = read('.vibe/projects/xerge-expo-demo/reviews/PKT-xerge-expo-demo-20260426-wayfinder-compliance.gan.yaml');
for (const req of ['packet_id:', 'generator:', 'adversary:', 'visionary:', 'synthesis_decision:', 'evidence_status:', 'required_checks:']) {
  if (!gan.includes(req)) fail(`GAN review missing ${req}`);
}

const adrFiles = fs.readdirSync(path.join(root, 'docs/adr')).filter((f) => f.endsWith('.md'));
for (const f of adrFiles) {
  const txt = read(path.join('docs/adr', f));
  for (const section of ['# ADR', '## Status', '## Context', '## Decision', '## Consequences', '## Alternatives considered']) {
    if (!txt.includes(section)) fail(`${f} missing section ${section}`);
  }
}

if (process.exitCode) process.exit(process.exitCode);
console.log('Wayfinder check: PASS');
