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

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}
function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exitCode = 1;
}

for (const file of requiredSignposts) if (!exists(file)) fail(`Missing signpost ${file}`);
for (const file of requiredVibe) if (!exists(file)) fail(`Missing .vibe artifact ${file}`);
if (!exists('repo_index.yaml')) fail('Missing repo_index.yaml');
if (!exists('docs/adr')) fail('Missing docs/adr directory');

const adrFiles = exists('docs/adr') ? fs.readdirSync(path.join(root, 'docs/adr')).filter((f) => f.endsWith('.md')) : [];
for (const f of adrFiles) {
  const txt = fs.readFileSync(path.join(root, 'docs/adr', f), 'utf8');
  for (const h of ['# ADR', '## Status', '## Context', '## Decision', '## Consequences', '## Alternatives considered']) {
    if (!txt.includes(h)) fail(`${f} missing section ${h}`);
  }
}

const wfFiles = [
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

for (const file of wfFiles) {
  const txt = fs.readFileSync(path.join(root, file), 'utf8');
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
  for (const p of paths) if (!exists(p)) fail(`${file} points to missing path ${p}`);
}

const repoIndex = fs.readFileSync(path.join(root, 'repo_index.yaml'), 'utf8');
for (const req of ['required_signposts', 'modules:', 'adr_directory:', 'vibe_project_path:', 'validation_commands:']) {
  if (!repoIndex.includes(req)) fail(`repo_index.yaml missing ${req}`);
}

const registry = fs.readFileSync(path.join(root, '.vibe/registry/xerge-expo-demo.yaml'), 'utf8');
const planMatch = registry.match(/plan_path:\s*(.+)/);
if (!planMatch) fail('registry missing plan_path');
else if (!exists(planMatch[1].trim())) fail(`registry plan_path missing target ${planMatch[1].trim()}`);

const packet = fs.readFileSync(path.join(root, '.vibe/projects/xerge-expo-demo/packets/PKT-xerge-expo-demo-20260426-wayfinder-compliance.yaml'), 'utf8');
for (const field of [
  'packet_id:',
  'project_id:',
  'title:',
  'status:',
  'complexity_tier:',
  'intent:',
  'must_not:',
  'read_first:',
  'allowed_read_paths:',
  'allowed_write_paths:',
  'forbidden_paths:',
  'local_context_files:',
  'constraints:',
  'acceptance_criteria:',
  'commands_to_run:',
  'docs_to_update:',
  'rollback_notes:',
  'completion_definition:',
  'max_context_tokens:',
]) {
  if (!packet.includes(field)) fail(`packet missing ${field}`);
}

if (process.exitCode) process.exit(process.exitCode);
console.log('Wayfinder check: PASS');
