import type { MetadataRoute } from "next";
import { getPublicNavigation, getPublishedPosts, type PublicMenu } from "../lib/cms";

const siteURL = process.env.NEXT_PUBLIC_SITE_URL || "https://ruang-baca-kebijakan-cms.vercel.app";

function flatten(items: PublicMenu[]): PublicMenu[] {
  return items.flatMap((item) => [item, ...flatten(item.children)]);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [navigation, posts] = await Promise.all([
    getPublicNavigation(),
    getPublishedPosts({ limit: 500 }),
  ]);

  return [
    { url: siteURL, changeFrequency: "weekly", priority: 1 },
    ...flatten(navigation).map((item) => ({
      url: `${siteURL}/${item.slug}`,
      changeFrequency: "weekly" as const,
      priority: item.children.length ? 0.8 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${siteURL}/artikel/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
