import type { MetadataRoute } from "next";

const siteURL = process.env.NEXT_PUBLIC_SITE_URL || "https://ruang-baca-kebijakan-cms.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${siteURL}/sitemap.xml`,
  };
}
