import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPost } from "../../../../lib/cms";
import type { Media, Navigation } from "../../../../payload-types";
import { EditButton } from "../../EditButton";

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

  return <main className="article-page">
    <EditButton href={`/admin/collections/posts/${post.id}`} label="Edit artikel" />
    <header className="article-header">
      <p className="eyebrow">{section?.label || post.contentType.replaceAll("-", " ")}</p>
      <h1>{post.title}</h1>
      <p className="article-excerpt">{post.excerpt}</p>
      <div className="article-meta">
        {post.publishedAt && <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(post.publishedAt))}</time>}
        {section && <a href={`/${section.slug}`}>{section.label}</a>}
      </div>
    </header>
    {image?.url && <figure className="article-hero">
      {/* Payload serves uploaded images from the local media endpoint. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.url} alt={image.alt} />
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>}
    <article className="article-body">
      <RichText data={post.content} />
      {attachment?.url && <a className="primary article-download" href={attachment.url} download>Unduh lampiran PDF <span aria-hidden="true">↓</span></a>}
    </article>
  </main>;
}
