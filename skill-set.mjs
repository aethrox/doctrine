import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

// The skills directory is the only source of truth for which skills exist.
// Anything that restates the list or the count by hand drifts from it silently.
export function discoverSkillNames(skillsDir) {
  return readdirSync(skillsDir)
    .filter((dir) => {
      try {
        return statSync(join(skillsDir, dir, "SKILL.md")).isFile();
      } catch {
        return false;
      }
    })
    .sort();
}
