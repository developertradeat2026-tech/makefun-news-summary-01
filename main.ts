// News-summary-01 entry point. Reads summary.txt and writes it to
// /output/entry.txt where the grader reads it. Fully deterministic:
// no network, no randomness, no wall-clock. Local test:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

const src = new URL('./summary.txt', import.meta.url);
const text = readFileSync(src, 'utf8');
if (text.length > 2000) {
  throw new Error(`summary is ${text.length} chars, over the 2000-char cap`);
}
if (text.length === 0) {
  throw new Error('summary.txt is empty');
}

const dest = join(outDir, 'entry.txt');
copyFileSync(src, dest);

// sanity: confirm the write landed
const written = statSync(dest).size;
if (written === 0) throw new Error('entry.txt was written as empty');
