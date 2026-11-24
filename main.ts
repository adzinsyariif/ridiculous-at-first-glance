// Ridiculous at First Glance, Real by the Second
// Writes one pitch sentence (<= 200 chars) to /output/entry.txt.
// Node 22, stdlib only, fully deterministic: the same bytes every run.

import { mkdirSync, writeFileSync } from "node:fs";

// Candidate pitch (v2): "friendly strangers" is punchier and stranger than
// "friendly actors" — the buyer is paying for the illusion of being known,
// and the turn from laughing to nodding lands on the final clause.
const ENTRY =
  "We hire friendly strangers to wave from your driveway at passing neighbours each morning, because new homeowners pay $99 a month to look like the most popular person on a street that never talks.";

// Gate guard: the entry must be exactly one sentence of 1-200 chars.
// Failing loudly here beats shipping an invalid entry to the judge.
if (ENTRY.length > 200 || ENTRY.length < 1) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-200`);
}
const sentenceEndings = (ENTRY.match(/[.!?]/g) ?? []).length;
if (sentenceEndings !== 1 || !ENTRY.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
