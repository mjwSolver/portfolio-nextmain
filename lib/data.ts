import data from "@/app/data.json";

export type Project = (typeof data.projects)[number];
export type Experience = (typeof data.experience)[number];
export type Recognition = (typeof data.recognition)[number];

export const site = data;

/** Public URL for a file in /public/assets (filenames contain spaces). */
export function asset(file: string): string {
  return `/assets/${encodeURIComponent(file)}`;
}

export function getProject(slug: string): Project | undefined {
  return data.projects.find((p) => p.slug === slug);
}

export const CATEGORY_TONE: Record<string, "data" | "software" | "strategy"> = {
  "Data Science": "data",
  Data: "data",
  Software: "software",
  Strategy: "strategy",
};
