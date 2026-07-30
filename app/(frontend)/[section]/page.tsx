import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicNavigation, getPublishedPosts, type PublicMenu } from "../../../lib/cms";
import type { Media } from "../../../payload-types";
import { EditButton } from "../EditButton";

function findMenu(items: PublicMenu[], slug: string): PublicMenu | null {
  for (const item of items) {
    if (item.slug === slug) return item;
    const child = findMenu(item.children, slug);
    if (child) return child;
  }
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  const menu = findMenu(await getPublicNavigation(), section);
  return {
    title: menu?.pageTitle || menu?.label || "Halaman",
    description: menu?.description,
  };
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const [menuItems, cmsPosts] = await Promise.all([
    getPublicNavigation(),
    getPublishedPosts({ sectionSlug: section }),
  ]);
  const menu = findMenu(menuItems, section);
  if (!menu) notFound();

  if (cmsPosts.length === 1 && menu.children.length === 0) {
    const post = cmsPosts[0];
    const image = typeof post.featuredImage === "object" ? post.featuredImage as Media : null;
    const attachment = typeof post.attachment === "object" ? post.attachment as Media : null;

    return <main className="article-page">
      <EditButton href={`/admin/collections/posts/${post.id}`} label="Edit artikel" />
      <header className="article-header">
        <p className="eyebrow">{menu.label}</p>
        <h1>{post.title}</h1>
        <p className="article-excerpt">{post.excerpt}</p>
        {post.publishedAt && <div className="article-meta">
          <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(post.publishedAt))}</time>
        </div>}
      </header>
      {image?.url && <figure className="article-hero">
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

  const first = cmsPosts[0];
  const featureTitle = first?.title;
  const featureDescription = first?.excerpt;

  return <main className="inner-page">
    <EditButton href={`/admin/collections/navigation/${menu.id}`} label="Edit halaman" />
    <header className="page-hero">
      <p className="eyebrow">{menu.label}</p>
      <h1>{menu.pageTitle || menu.label}</h1>
      <p>{menu.description || "Materi dan informasi pada halaman ini dikelola melalui dashboard."}</p>
    </header>
    {featureTitle && featureDescription && <section className="feature-band">
      <div><small>Pilihan utama</small><h2>{featureTitle}</h2></div>
      <p>{featureDescription}</p>
      {first && <a className="underlined" href={`/artikel/${first.slug}`}>Baca materi <span>→</span></a>}
    </section>}
    <section className="listing section-shell" id="daftar">
      <p className="section-number">Materi diterbitkan</p>
      {cmsPosts.length ? <div className="listing-grid">{cmsPosts.map((item, i) => <article key={item.id}>
        <span className="publication-no">{String(i + 1).padStart(2, "0")}</span>
        <small>{item.contentType.replaceAll("-", " ")} {item.eventDate ? `· ${new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(item.eventDate))}` : item.publishedAt ? `· ${new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(item.publishedAt))}` : ""}</small>
        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>
        <a className="underlined" href={`/artikel/${item.slug}`}>Baca selengkapnya <span>→</span></a>
      </article>)}</div> : <div className="empty-content"><h2>Belum ada materi yang diterbitkan.</h2><p>Tambahkan artikel melalui dashboard dan pilih halaman ini pada “Tampilkan di menu / submenu”.</p></div>}
    </section>
    {menu.note && <aside className="editorial-note"><span>Catatan</span><p>{menu.note}</p></aside>}
  </main>;
}
