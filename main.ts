// One Sentence, One Journey — entrypoint.
// Writes a single complete journey story, exactly one sentence, to entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY =
  "The map said the lighthouse was a day's walk from the harbour, but the tide swallowed the path by noon, so I waded through salt water with my shoes slung around my neck until its beam found me — and the keeper, who had waited sixty years for a visitor, looked at the sunset and said, 'You're late.'";

// Gate self-check, mirroring the brief: 1–300 characters, not only
// whitespace, and exactly one sentence (a single terminal full stop).
function validate(text: string): void {
  if (text.trim().length === 0) throw new Error("entry is blank");
  if (text.length < 1 || text.length > 300) {
    throw new Error(`entry is ${text.length} characters, must be 1–300`);
  }
  const stops = (text.match(/\./g) ?? []).length;
  // The sentence may close inside a quotation: strip trailing quote
  // marks before checking for the single terminal full stop.
  const core = text.trimEnd().replace(/['"”’]+$/, "");
  if (stops !== 1 || !core.endsWith(".")) {
    throw new Error(`entry has ${stops} full stops, must be exactly one sentence`);
  }
}

validate(STORY);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), STORY, "utf8");
console.log(`Wrote ${STORY.length} characters to ${join(outDir, "entry.txt")}`);
