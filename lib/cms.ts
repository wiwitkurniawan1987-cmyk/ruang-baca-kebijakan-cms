import config from "@payload-config";
import { getPayload } from "payload";
import type { Navigation, Post, SiteSetting } from "../payload-types";

export type PublicMenu = {
  id: number | string;
  label: string;
  slug: string;
  href: string;
  description?: string | null;
  children: PublicMenu[];
};

export const fallbackNavigation: PublicMenu[] = [
  { id: "riset", label: "Riset & Publikasi", slug: "riset-publikasi", href: "/riset-publikasi", children: [] },
  { id: "perpustakaan", label: "Perpustakaan", slug: "perpustakaan", href: "/perpustakaan", children: [] },
  { id: "taman-baca", label: "Taman Baca", slug: "taman-baca", href: "/taman-baca", children: [] },
  { id: "agenda", label: "Agenda", slug: "agenda", href: "/agenda", children: [] },
  { id: "tentang", label: "Tentang Kami", slug: "tentang", href: "/tentang", children: [] },
];

async function payloadClient() {
  return getPayload({ config });
}

export async function getPublicNavigation(): Promise<PublicMenu[]> {
  try {
    const payload = await payloadClient();
    const result = await payload.find({
      collection: "navigation",
      depth: 1,
      limit: 200,
      overrideAccess: false,
      pagination: false,
      sort: "order",
      where: { enabled: { equals: true } },
    });

    if (!result.docs.length) return fallbackNavigation;

    const items = result.docs.map((item: Navigation) => ({
      id: item.id,
      label: item.label,
      slug: item.slug,
      href: `/${item.slug}`,
      description: item.description,
      parentId:
        typeof item.parent === "object" && item.parent
          ? item.parent.id
          : item.parent ?? null,
      order: item.order,
      children: [] as PublicMenu[],
    }));

    const byId = new Map(items.map((item) => [item.id, item]));
    const roots: PublicMenu[] = [];

    for (const item of items) {
      const menu: PublicMenu = {
        id: item.id,
        label: item.label,
        slug: item.slug,
        href: item.href,
        description: item.description,
        children: item.children,
      };
      const parent = item.parentId ? byId.get(item.parentId) : null;
      if (parent) parent.children.push(menu);
      else roots.push(menu);
    }

    return roots;
  } catch {
    return fallbackNavigation;
  }
}

export async function getSiteSettings(): Promise<SiteSetting | null> {
  try {
    const payload = await payloadClient();
    return await payload.findGlobal({
      slug: "site-settings",
      overrideAccess: false,
    });
  } catch {
    return null;
  }
}

export async function getPublishedPosts(options?: {
  limit?: number;
  sectionSlug?: string;
}): Promise<Post[]> {
  try {
    const payload = await payloadClient();
    let sectionId: number | undefined;

    if (options?.sectionSlug) {
      const section = await payload.find({
        collection: "navigation",
        limit: 1,
        overrideAccess: false,
        where: { slug: { equals: options.sectionSlug } },
      });
      sectionId = section.docs[0]?.id;
      if (!sectionId) return [];
    }

    const result = await payload.find({
      collection: "posts",
      depth: 2,
      draft: false,
      limit: options?.limit ?? 24,
      overrideAccess: false,
      sort: "-publishedAt",
      where: sectionId ? { section: { equals: sectionId } } : undefined,
    });
    return result.docs;
  } catch {
    return [];
  }
}

export async function getPublishedPost(slug: string): Promise<Post | null> {
  try {
    const payload = await payloadClient();
    const result = await payload.find({
      collection: "posts",
      depth: 2,
      draft: false,
      limit: 1,
      overrideAccess: false,
      where: { slug: { equals: slug } },
    });
    return result.docs[0] ?? null;
  } catch {
    return null;
  }
}
