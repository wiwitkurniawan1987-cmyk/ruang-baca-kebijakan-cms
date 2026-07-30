/* eslint-disable @next/next/no-html-link-for-pages */
import type { CSSProperties } from "react";
import { getHomepageSettings, getPublishedPosts } from "../../lib/cms";
import type { Media, Post } from "../../payload-types";
import { EditButton } from "./EditButton";

const Arrow = () => <span aria-hidden="true">→</span>;

const contentTypeLabels: Record<string, string> = {
  article: "Artikel",
  "policy-brief": "Policy brief",
  "working-paper": "Working paper",
  event: "Agenda",
  library: "Koleksi",
};

function toCard(post: Post) {
  return {
    type: contentTypeLabels[post.contentType] || "Artikel",
    date: post.publishedAt
      ? new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(new Date(post.publishedAt))
      : "Terbaru",
    title: post.title,
    text: post.excerpt,
    href: `/artikel/${post.slug}`,
  };
}

function eventDateParts(post: Post) {
  const source = post.eventDate || post.publishedAt;
  if (!source) return { day: "—", month: "", year: "" };
  const date = new Date(source);
  return {
    day: new Intl.DateTimeFormat("id-ID", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("id-ID", { month: "short" }).format(date).toUpperCase(),
    year: new Intl.DateTimeFormat("id-ID", { year: "numeric" }).format(date),
  };
}

export default async function Home() {
  const [homepage, latestPosts, highlightedPosts, mainAgendaPosts, agendaPosts] = await Promise.all([
    getHomepageSettings(),
    getPublishedPosts({ limit: 3, sectionSlug: "terbitan-terbaru" }),
    getPublishedPosts({ limit: 2, featured: true }),
    getPublishedPosts({ limit: 2, mainAgenda: true }),
    getPublishedPosts({ limit: 1, sectionSlug: "agenda", sort: "eventDate" }),
  ]);

  const heroImage = typeof homepage?.heroImage === "object" ? homepage.heroImage as Media : null;
  const heroStyle = heroImage?.url ? { backgroundImage: `linear-gradient(90deg,rgba(242,232,213,.26),transparent 24%),url('${heroImage.url}')` } as CSSProperties : undefined;
  const latest = latestPosts.map(toCard);
  const highlights = highlightedPosts.map(toCard);
  const mainAgenda = mainAgendaPosts.map(toCard);
  const agenda = agendaPosts[0];
  const agendaDate = agenda ? eventDateParts(agenda) : null;

  return <main>
    <EditButton href="/admin/globals/homepage" label="Edit beranda" />
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">{homepage?.heroEyebrow}</p>
        <h1>{homepage?.heroTitle}</h1>
        <p>{homepage?.heroDescription}</p>
        <div className="actions">
          <a className="primary" href={homepage?.primaryButtonHref}>{homepage?.primaryButtonLabel} <Arrow /></a>
          <a className="underlined" href={homepage?.secondaryButtonHref}>{homepage?.secondaryButtonLabel} <Arrow /></a>
        </div>
      </div>
      <div className="hero-image" style={heroStyle} role="img" aria-label={heroImage?.alt || "Ruang Baca Kebijakan"}><div className="paper p1"/><div className="paper p2"/><div className="paper p3"/><span>ruang baca kebijakan</span></div>
    </section>

    {highlights.length > 0 && <section className="ticker" aria-label="Sorotan">
      {highlights.map((item, index) => <a href={item.href} key={item.title}><i>0{index + 1}</i><span><small>{item.type}</small><strong>{item.title}</strong></span><Arrow /></a>)}
    </section>}

    <section className="intro section-shell">
      <p className="section-number">{homepage?.focusLabel}</p>
      <div><h2>{homepage?.focusTitle}</h2><p>{homepage?.focusDescription}</p></div>
      {homepage?.focusItems?.length ? <div className="pillars">{homepage.focusItems.map((item) => <article key={item.id || item.title}><b>{item.title}</b><p>{item.description}</p></article>)}</div> : null}
    </section>

    <section className="publication-section section-shell" id="kajian-terbaru">
      <div className="section-heading"><div><p className="section-number">{homepage?.latestLabel}</p><h2>{homepage?.latestTitle}</h2></div><a className="underlined" href="/terbitan-terbaru">Semua publikasi <Arrow /></a></div>
      {latest.length ? <div className="publication-grid">{latest.map((item, index) => <article className="publication" key={item.title}><span className="publication-no">0{index + 1}</span><small>{item.type} · {item.date}</small><h3>{item.title}</h3><p>{item.text}</p><a href={item.href}>Baca materi <Arrow /></a></article>)}</div> : <div className="empty-content"><p>Belum ada materi yang diterbitkan.</p></div>}
    </section>

    {mainAgenda.length > 0 && <section className="public-space">
      <div className="public-copy"><p className="section-number">{homepage?.mainAgendaLabel}</p><h2>{homepage?.mainAgendaTitle}</h2><p>{homepage?.mainAgendaDescription}</p></div>
      {mainAgenda.map((item, index) => <a className={`space-card ${index % 2 === 0 ? "library-card" : "reading-card"}`} href={item.href} key={item.title}><small>{item.type}{item.date ? ` · ${item.date}` : ""}</small><h3>{item.title}</h3><span>Lihat materi <Arrow /></span></a>)}
    </section>}

    {agenda && agendaDate && <section className="agenda-home section-shell">
      <div className="section-heading"><div><p className="section-number">{homepage?.agendaLabel}</p><h2>{homepage?.agendaTitle}</h2></div><a className="underlined" href="/agenda">Lihat semua <Arrow /></a></div>
      <article className="event-feature"><div className="date-block"><strong>{agendaDate.day}</strong><span>{agendaDate.month}<br/>{agendaDate.year}</span></div><div><small>{contentTypeLabels[agenda.contentType]}{agenda.eventLocation ? ` · ${agenda.eventLocation}` : ""}</small><h3>{agenda.title}</h3><p>{agenda.excerpt}</p></div><a className="primary" href={`/artikel/${agenda.slug}`}>Detail acara <Arrow /></a></article>
    </section>}
  </main>;
}
