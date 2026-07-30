import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPost, getPublishedPosts } from "../../../../lib/cms";
import type { Media, Navigation, Post } from "../../../../payload-types";
import { EditButton } from "../../EditButton";

const contentTypeLabels: Record<Post["contentType"], string> = {
  article: "Artikel",
  "policy-brief": "Policy Brief",
  "working-paper": "Working Paper",
  event: "Agenda",
  library: "Koleksi",
};

function collectText(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  if ("text" in value && typeof value.text === "string") return value.text;
  if ("children" in value && Array.isArray(value.children)) {
    return value.children.map(collectText).join(" ");
  }
  if ("root" in value) return collectText(value.root);
  return "";
}

function readingTime(post: Post): number {
  const words = `${post.excerpt} ${collectText(post.content)}`.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "long", timeStyle: "short" }).format(new Date(value));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  return {
    title: post?.seoTitle || post?.title || "Artikel",
    description: post?.seoDescription || post?.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const image = typeof post.featuredImage === "object" ? post.featuredImage as Media : null;
  const section = typeof post.section === "object" ? post.section as Navigation : null;
  const attachment = typeof post.attachment === "object" ? post.attachment as Media : null;
  const relatedPosts = section?.slug
    ? (await getPublishedPosts({ sectionSlug: section.slug, includeChildren: false, limit: 8 }))
      .filter((item) => item.id !== post.id)
      .slice(0, 3)
    : [];

  return <main className="article-page">
    <EditButton href={`/admin/collections/posts/${post.id}`} label="Edit artikel" />
    <header className="article-header">
      <a className="article-back" href={section ? `/${section.slug}` : "/"}>← {section?.label || "Beranda"}</a>
      <p className="eyebrow">{contentTypeLabels[post.contentType]}</p>
      <h1>{post.title}</h1>
      <p className="article-excerpt">{post.excerpt}</p>
      <div className="article-meta">
        {post.publishedAt && <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(post.publishedAt))}</time>}
        <span>{readingTime(post)} menit baca</span>
        {section && <a href={`/${section.slug}`}>{section.label}</a>}
      </div>
    </header>
    {image?.url && <figure className="article-hero">
      {/* Payload serves uploaded images from the local media endpoint. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.url} alt={image.alt} />
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>}
    {post.contentType === "event" && (post.eventDate || post.eventLocation) && <aside className="event-details">
      {post.eventDate && <div>
        <small>Waktu</small>
        <strong>{formatDate(post.eventDate)}</strong>
      </div>}
      {post.eventLocation && <div>
        <small>Lokasi / format</small>
        <strong>{post.eventLocation}</strong>
      </div>}
    </aside>}
    <article className="article-body">
      <RichText data={post.content} />
      {attachment?.url && <a className="primary article-download" href={attachment.url} download>Unduh lampiran PDF <span aria-hidden="true">↓</span></a>}
    </article>
    {relatedPosts.length > 0 && <section className="related-reading section-shell">
      <div className="section-heading">
        <div>
          <p className="section-number">Lanjut membaca</p>
          <h2>Materi terkait</h2>
        </div>
      </div>
      <div className="related-grid">
        {relatedPosts.map((item) => <a href={`/artikel/${item.slug}`} key={item.id}>
          <small>{contentTypeLabels[item.contentType]}</small>
          <h3>{item.title}</h3>
          <p>{item.excerpt}</p>
          <span>Baca materi →</span>
        </a>)}
      </div>
    </section>}
  </main>;
}
