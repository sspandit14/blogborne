// Site-wide constants and navigation, so header, footer, home masthead and
// the archive page all read from one place.

export const SITE = {
  title: "Blogborne",
  tagline: "the blog-based dissemination of thoughts",
};

// The writer, shown on the About page (placeholders for now).
export const AUTHOR = {
  name: "Sahil",
  email: "which@email?",
};

export const ARCHIVES = "/archives/";

/** The archive page filtered to one tag. */
export function archiveTagHref(tag: string): string {
  return `${ARCHIVES}?tag=${encodeURIComponent(tag.toLowerCase())}`;
}

// The subjects, in the order used everywhere (Home section row, archive filter chips).
export const SUBJECTS = [
  { label: "Books", tag: "books" },
  { label: "Films", tag: "film" },
  { label: "Games", tag: "games" },
  { label: "Philosophy", tag: "philosophy" },
];

// Home's section row: each subject, then Archives.
export const SECTIONS = [
  ...SUBJECTS.map((s) => ({ label: s.label, href: archiveTagHref(s.tag) })),
  { label: "Archives", href: ARCHIVES },
];

// Right side of the compact header (every page except Home).
export const PAGES = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Archives", href: ARCHIVES },
];
