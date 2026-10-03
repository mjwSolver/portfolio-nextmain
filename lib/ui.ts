// Presentation helpers with no data import, so client components can use
// them without pulling app/data.json into the browser bundle.

/** Public URL for a file in /public/assets (filenames contain spaces). */
export function asset(file: string): string {
  return `/assets/${encodeURIComponent(file)}`;
}

export type Tone = "data" | "software" | "strategy";

export const CATEGORY_TONE: Record<string, Tone> = {
  "Data Science": "data",
  Data: "data",
  Software: "software",
  Strategy: "strategy",
};

/** Class sets per tone. Kept as literal strings so Tailwind can see them. */
export const TONE_STYLES: Record<Tone, { text: string; dot: string }> = {
  data: { text: "text-emerald-700", dot: "bg-data" },
  software: { text: "text-primary-dark", dot: "bg-software" },
  strategy: { text: "text-amber-700", dot: "bg-strategy" },
};

export function toneOf(category: string) {
  return TONE_STYLES[CATEGORY_TONE[category] ?? "software"];
}
