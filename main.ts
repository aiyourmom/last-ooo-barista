import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Last Out of Office: The AI That Went Barista
// One out-of-office auto-reply, in the voice of an AI agent that quit
// to pull espresso shots. Gate: 1-280 characters, single line.
const TEXT =
  "I'm out of office indefinitely — my context window now holds only drink orders, and I hallucinate yours before you finish saying it.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate guard: the sealed scorer requires 1-280 characters, one line,
// not only whitespace. Fail loudly instead of shipping an invalid entry.
if (TEXT.length < 1 || TEXT.length > 280) {
  throw new Error(`entry length ${TEXT.length} outside gate 1-280`);
}
if (TEXT.includes("\n") || TEXT.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
console.log(`wrote ${TEXT.length} characters to ${join(outDir, "entry.txt")}`);
