// Site-wide constants and navigation, so header, footer and home masthead
// all read from one place.

export const SITE = {
  title: "Blogborne",
  tagline: "Essays on film, games, books & philosophy, set down by lamplight",
};

// Section links in the masthead/compact header.
// They point at the search page filtered by tag (built in a later step).
export const SECTIONS = [
  { label: "Film", href: "/search/?tag=film" },
  { label: "Games", href: "/search/?tag=games" },
  { label: "Philosophy", href: "/search/?tag=philosophy" },
  { label: "Archives", href: "/search/" },
];

// Filter chips on the search page (besides "All").
export const SUBJECTS = ["Film", "Games", "Philosophy", "Books"];

export const UTILITY = [
  { label: "Search", href: "/search/" },
  { label: "About", href: "/about/" },
];
