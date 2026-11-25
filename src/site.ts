// Site-wide constants and navigation, so header, footer, home masthead and
// the archive page all read from one place.

// The subject list lives in its own file (the content schema needs it too).
import { SUBJECTS } from "./subjects";
export { SUBJECTS, subjectLabel } from "./subjects";

export const SITE = {
  title: "Blogborne",
  tagline: "the blog-based dissemination of thoughts",
};

// The writer, shown on the About page
export const AUTHOR = {
  name: "Sahil",
  email: "blogborne@coldinstantcoffee.com",
};

// The base path from astro.config.mjs ("/blogborne" on GitHub Pages, "" on a
// custom domain), without its trailing slash.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Turn a site path into a real link: url("/about/") → "/blogborne/about/".
 * Every internal link goes through this, so moving the site only means
 * changing `base` in astro.config.mjs.
 */
export function url(path: string): string {
  return BASE + path;
}

export const ARCHIVES = url("/archives/");

/** The archive page filtered to one subject: /archives/?subject=film */
export function subjectHref(id: string): string {
  return `${ARCHIVES}?subject=${encodeURIComponent(id)}`;
}

/** The archive page searching for one tag: /archives/?q=tag:grief (quoted if it has spaces). */
export function tagHref(tag: string): string {
  const t = tag.toLowerCase();
  return `${ARCHIVES}?q=${encodeURIComponent(/\s/.test(t) ? `tag:"${t}"` : `tag:${t}`)}`;
}


// Home's section row: each subject, then Archives.
export const SECTIONS = [
  ...SUBJECTS.map((s) => ({ label: s.label, href: subjectHref(s.id) })),
  { label: "Archives", href: ARCHIVES },
];

// Right side of the compact header (every page except Home).
export const PAGES = [
  { label: "Home", href: url("/") },
  { label: "About", href: url("/about/") },
  { label: "Archives", href: ARCHIVES },
];
