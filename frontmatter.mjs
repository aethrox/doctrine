import { load } from "js-yaml";

export function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) throw new Error("missing YAML frontmatter");
  return { frontmatter: load(match[1]), body: match[2] };
}
