import config from "@payload-config";
import { getPayload, type Where } from "payload";
import type { Homepage, Navigation, Post, SiteSetting } from "../payload-types";

export type PublicMenu = {
  id: number | string;
  label: string;
  slug: string;
  href: string;
  description?: string | null;
  pageTitle?: string | null;
  featureTitle?: string | null;
  featureDescription?: string | null;
  note?: string | null;
  children: PublicMenu[];
};

export const fallbackNavigation: PublicMenu[] = [
  { id: "fokus-kami", label: "Fokus Kami", slug: "fokus-kami", href: "/fokus-kami", children: [] },
  { id: "terbitan-terbaru", label: "Terbitan Terbaru", slug: "terbitan-terbaru", href: "/terbitan-terbaru", children: [] },
  {
    id: "ruang-pengetahuan",
    label: "Ruang Pengetahuan",
    slug: "ruang-pengetahuan",
    href: "/ruang-pengetahuan",
    children: [
      { id: "perpustakaan", label: "Perpustakaan", slug: "perpustakaan", href: "/perpustakaan", children: [] },
      { id: "taman-baca", label: "Taman Baca", slug: "taman-baca", href: "/taman-baca", children: [] },
    ],
  },
  { id: "agenda", label: "Agenda", slug: "agenda", href: "/agenda", children: [] },
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
      pageTitle: item.pageTitle,
      featureTitle: item.featureTitle,
      featureDescription: item.featureDescription,
      note: item.note,
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
        pageTitle: item.pageTitle,
        featureTitle: item.featureTitle,
        featureDescription: item.featureDescription,
        note: item.note,
        children: item.children,
      };
      const parent = item.parentId && item.parentId !== item.id
        ? byId.get(item.parentId)
        : null;
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

export async function getHomepageSettings(): Promise<Homepage | null> {
  try {
    const payload = await payloadClient();
    return await payload.findGlobal({
      slug: "homepage",
      depth: 1,
      overrideAccess: false,
    });
  } catch {
    return null;
  }
}

export async function getPublishedPosts(options?: {
  limit?: number;
  sectionSlug?: string;
  featured?: boolean;
  mainAgenda?: boolean;
  sort?: string;
}): Promise<Post[]> {
  try {
    const payload = await payloadClient();
    let sectionIds: number[] = [];

    if (options?.sectionSlug) {
      const navigation = await payload.find({
        collection: "navigation",
        depth: 0,
        limit: 200,
        overrideAccess: false,
        pagination: false,
        where: { enabled: { equals: true } },
      });
      const section = navigation.docs.find((item) => item.slug === options.sectionSlug);
      if (!section) return [];

      sectionIds = [Number(section.id)];
      let changed = true;
      while (changed) {
        changed = false;
        for (const item of navigation.docs) {
          const parentId = typeof item.parent === "object" && item.parent
            ? Number(item.parent.id)
            : item.parent ? Number(item.parent) : null;
          if (parentId && sectionIds.includes(parentId) && !sectionIds.includes(Number(item.id))) {
            sectionIds.push(Number(item.id));
            changed = true;
          }
        }
      }
    }

    const conditions: Where[] = [];
    if (sectionIds.length) conditions.push({ section: { in: sectionIds } });
    if (options?.featured !== undefined) {
      conditions.push({ featured: { equals: options.featured } });
    }
    if (options?.mainAgenda !== undefined) {
      conditions.push({ mainAgenda: { equals: options.mainAgenda } });
    }

    const result = await payload.find({
      collection: "posts",
      depth: 2,
      draft: false,
      limit: options?.limit ?? 24,
      overrideAccess: false,
      sort: options?.sort ?? "-publishedAt",
      where: conditions.length ? { and: conditions } : undefined,
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
