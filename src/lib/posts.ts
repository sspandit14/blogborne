// Helpers for querying and presenting posts. Pages call these instead of
// repeating filter/sort/format logic.
import { getCollection, type CollectionEntry } from "astro:content";
import { url } from "../site";

export type Post = CollectionEntry<"posts">;

/** All non-draft posts, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

const DATE_STYLES = {
  full:   { weekday: "long", day: "numeric", month: "long", year: "numeric" }, // Saturday, 21 November 2026
  long:   { day: "numeric", month: "long", year: "numeric" },                  // 21 November 2026
  medium: { day: "numeric", month: "short", year: "numeric" },                 // 21 Nov 2026
  short:  { day: "numeric", month: "short" },                                  // 21 Nov
} satisfies Record<string, Intl.DateTimeFormatOptions>;

export function formatDate(date: Date, style: keyof typeof DATE_STYLES = "long"): string {
  // Frontmatter dates are parsed as UTC midnight; formatting in UTC stops
  // them shifting to the previous day in timezones west of Greenwich.
  return date.toLocaleDateString("en-GB", { ...DATE_STYLES[style], timeZone: "UTC" });
}

/** URL of a post's page. */
export function postHref(post: Post): string {
  return url(`/posts/${post.id}/`);
}

/**
 * Plain-text opening of a post for the Home lead: the first real paragraph
 * of the Markdown body (skipping headings, quotes, images, rules), with
 * Markdown syntax stripped and cut to roughly `words` words.
 */
export function excerpt(body: string = "", words = 70): string {
  const para =
    body
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .find((p) => p && !/^(#|>|!\[|\*\*\*|---|\[\^)/.test(p)) ?? "";
  const text = para
    .replace(/\[\^[^\]]+\]/g, "")              // footnote refs
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // links and images → their text
    .replace(/[*_`]/g, "")                     // emphasis and code marks
    .replace(/\s+/g, " ")
    .trim();
  const list = text.split(" ");
  return list.length > words ? list.slice(0, words).join(" ") + "…" : text;
}

/** Where a tag links to: the archive page filtered by that tag. */
export { archiveTagHref as tagHref } from "../site";
