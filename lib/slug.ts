import type { FieldHook } from "payload";

export function formatSlug(value: string): string {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const populateSlug: FieldHook = ({ data, value }) => {
  if (typeof value === "string" && value.trim()) return formatSlug(value);
  if (typeof data?.title === "string") return formatSlug(data.title);
  if (typeof data?.label === "string") return formatSlug(data.label);
  return value;
};
