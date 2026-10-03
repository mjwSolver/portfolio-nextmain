import data from "@/app/data.json";

export type Project = (typeof data.projects)[number];
export type Experience = (typeof data.experience)[number];
export type Recognition = (typeof data.recognition)[number];

export const site = data;

export { asset, toneOf } from "./ui";

export function getProject(slug: string): Project | undefined {
  return data.projects.find((p) => p.slug === slug);
}
