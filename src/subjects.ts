// The fixed list of subjects (sections) a post can belong to, in display order.
// Used by the content schema (to validate each post's `subjects`) and by the
// site navigation. Kept in its own file because content.config.ts imports it.
//
// `id` is what you write in frontmatter (subjects: [film]); `label` is what readers see.
export const SUBJECTS = [
  { id: "books", label: "Books" },
  { id: "film", label: "Films" },
  { id: "games", label: "Games" },
  { id: "philosophy", label: "Philosophy" },
] as const;

export type SubjectId = (typeof SUBJECTS)[number]["id"];

/** The ids as a tuple, the shape z.enum() needs. */
export const SUBJECT_IDS = SUBJECTS.map((s) => s.id) as [SubjectId, ...SubjectId[]];

export function subjectLabel(id: SubjectId): string {
  return SUBJECTS.find((s) => s.id === id)?.label ?? id;
}
