// Fixed summary for the 11 November 2026 news day. The text is the
// deliverable; this file exists only so the entry has a runnable program.
import { readFileSync } from "node:fs";
const summary = readFileSync(new URL("./summary.txt", import.meta.url), "utf8").trim();
if (summary.length > 2000) throw new Error("summary exceeds 2000 characters");
console.log(summary);
