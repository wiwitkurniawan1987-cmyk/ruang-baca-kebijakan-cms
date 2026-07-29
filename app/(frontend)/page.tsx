/* eslint-disable @next/next/no-html-link-for-pages */
import { getPublishedPosts } from "../../lib/cms";
import type { Post } from "../../payload-types";

const Arrow = () => <span aria-hidden="true">→</span>;

const publications = [
  { type: "Policy brief", date: "Juli 2026", title: "Pendidikan Digital dan Keadilan Akses", text: "Menguji apakah investasi teknologi benar-benar memperluas kesempatan belajar atau justru memperdalam ketimpangan." },
  { type: "Working paper", date: "Juni 2026", title: "Sekolah, Pilihan, dan Segregasi", text: "Pembacaan kritis atas hubungan kebijakan pilihan sekolah, mobilitas sosial, dan pemisahan antarkelompok." },
  { type: "Catatan riset", date: "Mei 2026", title: "Agama dan Ruang Publik Sekolah", text: "Kerangka perbandingan untuk memahami kebebasan beragama, netralitas negara, dan kehidupan bersama di sekolah." },
];

const fallbackHighlights = [
  { type: "Kajian terbaru", date: "", title: "Pendidikan Digital dan Keadilan Akses", text: "", href: "/riset-publikasi" },
  { type: "Diskusi publik", date: "", title: "Sekolah, Negara, dan Masa Depan Demokrasi", text: "", href: "/agenda" },
];

const fallbackMainAgenda = [
  { type: "Diskusi publik", date: "Agustus 2026", title: "Sekolah, Negara, dan Masa Depan Demokrasi", text: "", href: "/agenda" },
];

const contentTypeLabels: Record<string, string> = {
  article: "Artikel",
  "policy-brief": "Policy brief",
  "working-paper": "Working paper",
  event: "Agenda",
  library: "Koleksi",
};

const focusFallback = [
  { title: "Riset kebijakan", text: "Kajian independen yang kritis, kontekstual, dan dapat digunakan." },
  { title: "Literasi publik", text: "Koleksi dan program baca yang membuat pengetahuan lebih mudah diakses." },
  { title: "Dialog demokratis", text: "Forum yang mempertemukan peneliti, pendidik, warga, dan pembuat kebijakan." },
];

export default async function Home() {
  const [cmsPosts, focusPosts, highlightedPosts, mainAgendaPosts] = await Promise.all([
    getPublishedPosts({ limit: 3 }),
    getPublishedPosts({ limit: 3, sectionSlug: "fokus-kami" }),
    getPublishedPosts({ limit: 2, featured: true }),
    getPublishedPosts({ limit: 2, mainAgenda: true }),
  ]);
  const toCard = (post: Post) => ({
    type: contentTypeLabels[post.contentType] || "Artikel",
    date: post.publishedAt
      ? new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(new Date(post.publishedAt))
      : "Terbaru",
    title: post.title,
    text: post.excerpt,
    href: `/artikel/${post.slug}`,
  });
  const latest = cmsPosts.length
    ? cmsPosts.map(toCard)
    : publications.map((item) => ({ ...item, href: "/riset-publikasi" }));
  const highlights = highlightedPosts.length
    ? highlightedPosts.map(toCard)
    : fallbackHighlights;
  const mainAgenda = mainAgendaPosts.length
    ? mainAgendaPosts.map(toCard)
    : fallbackMainAgenda;
  const focusItems: Array<{ title: string; text: string; href?: string }> = focusPosts.length
    ? focusPosts.map((post) => ({ title: post.title, text: post.excerpt, href: `/artikel/${post.slug}` }))
    : focusFallback;

  return <main>
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Ruang Baca Kebijakan · Riset · Diskusi</p>
        <h1>Kebijakan pendidikan yang berlandaskan riset dan berakar dalam kehidupan sosial</h1>
        <p>Pusat riset dan ruang belajar bersama untuk menghubungkan kajian kebijakan, koleksi bacaan, serta percakapan publik.</p>
        <div className="actions"><a className="primary" href="/terbitan-terbaru">Jelajahi Kajian <Arrow /></a><a className="underlined" href="/agenda">Lihat Agenda <Arrow /></a></div>
      </div>
      <div className="hero-image" role="img" aria-label="Perpustakaan komunitas yang rindang dengan kegiatan membaca dan berdiskusi"><div className="paper p1"/><div className="paper p2"/><div className="paper p3"/><span>ruang baca kebijakan</span></div>
    </section>

    <section className="ticker" aria-label="Sorotan">
      {highlights.map((item, index) => <a href={item.href} key={item.title}><i>0{index + 1}</i><span><small>{item.type}</small><strong>{item.title}</strong></span><Arrow /></a>)}
    </section>

    <section className="intro section-shell">
      <p className="section-number">01 / Fokus Kami</p>
      <div><h2>Menghubungkan riset dengan kehidupan publik.</h2><p>Kebijakan pendidikan tidak seharusnya berhenti sebagai dokumen teknis. Kami mempertemukan penelitian, pengalaman masyarakat, dan perdebatan filosofis agar pilihan kebijakan dapat diperiksa secara terbuka.</p></div>
      <div className="pillars">{focusItems.map((item) => <article key={item.title}><b>{item.title}</b><p>{item.text}</p>{item.href && <a href={item.href}>Baca <Arrow /></a>}</article>)}</div>
    </section>

    <section className="publication-section section-shell" id="kajian-terbaru">
      <div className="section-heading"><div><p className="section-number">02 / Terbitan Terbaru</p><h2>Gagasan untuk diperiksa, bukan sekadar diterima.</h2></div><a className="underlined" href="/terbitan-terbaru">Semua publikasi <Arrow /></a></div>
      <div className="publication-grid">{latest.map((item, index) => <article className="publication" key={item.title}><span className="publication-no">0{index + 1}</span><small>{item.type} · {item.date}</small><h3>{item.title}</h3><p>{item.text}</p><a href={item.href}>Baca materi <Arrow /></a></article>)}</div>
    </section>

    <section className="public-space">
      <div className="public-copy"><p className="section-number">03 / Agenda Utama</p><h2>Pertemuan dan percakapan pilihan.</h2><p>Agenda utama yang mempertemukan peneliti, pendidik, warga, dan pembuat kebijakan dalam dialog terbuka.</p></div>
      {mainAgenda.map((item, index) => <a className={`space-card ${index % 2 === 0 ? "library-card" : "reading-card"}`} href={item.href} key={item.title}><small>{item.type}{item.date ? ` · ${item.date}` : ""}</small><h3>{item.title}</h3><span>Lihat agenda <Arrow /></span></a>)}
    </section>

    <section className="agenda-home section-shell">
      <div className="section-heading"><div><p className="section-number">04 / Agenda</p><h2>Percakapan publik berikutnya.</h2></div><a className="underlined" href="/agenda">Lihat semua <Arrow /></a></div>
      <article className="event-feature"><div className="date-block"><strong>08</strong><span>AGU<br/>2026</span></div><div><small>Diskusi publik · Hibrida</small><h3>Sekolah, Negara, dan Masa Depan Demokrasi</h3><p>Bagaimana pendidikan dapat membentuk warga demokratis tanpa berubah menjadi alat indoktrinasi?</p></div><a className="primary" href="/agenda">Detail acara <Arrow /></a></article>
    </section>
  </main>;
}
