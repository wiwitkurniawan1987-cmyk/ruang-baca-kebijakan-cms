/* eslint-disable @next/next/no-html-link-for-pages */
import { getPublishedPosts } from "../../lib/cms";

const Arrow = () => <span aria-hidden="true">→</span>;

const publications = [
  { type: "Policy brief", date: "Juli 2026", title: "Pendidikan Digital dan Keadilan Akses", text: "Menguji apakah investasi teknologi benar-benar memperluas kesempatan belajar atau justru memperdalam ketimpangan." },
  { type: "Working paper", date: "Juni 2026", title: "Sekolah, Pilihan, dan Segregasi", text: "Pembacaan kritis atas hubungan kebijakan pilihan sekolah, mobilitas sosial, dan pemisahan antarkelompok." },
  { type: "Catatan riset", date: "Mei 2026", title: "Agama dan Ruang Publik Sekolah", text: "Kerangka perbandingan untuk memahami kebebasan beragama, netralitas negara, dan kehidupan bersama di sekolah." },
];

const contentTypeLabels: Record<string, string> = {
  article: "Artikel",
  "policy-brief": "Policy brief",
  "working-paper": "Working paper",
  event: "Agenda",
  library: "Koleksi",
};

export default async function Home() {
  const cmsPosts = await getPublishedPosts({ limit: 3 });
  const latest = cmsPosts.length ? cmsPosts.map((post) => ({
    type: contentTypeLabels[post.contentType] || "Artikel",
    date: post.publishedAt
      ? new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(new Date(post.publishedAt))
      : "Terbaru",
    title: post.title,
    text: post.excerpt,
    href: `/artikel/${post.slug}`,
  })) : publications.map((item) => ({ ...item, href: "/riset-publikasi" }));

  return <main>
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Ruang Baca Kebijakan · Riset · Diskusi</p>
        <h1>Kebijakan pendidikan yang berlandaskan riset dan berakar dalam kehidupan sosial</h1>
        <p>Pusat riset dan ruang belajar bersama untuk menghubungkan kajian kebijakan, koleksi bacaan, serta percakapan publik.</p>
        <div className="actions"><a className="primary" href="/riset-publikasi">Jelajahi Kajian <Arrow /></a><a className="underlined" href="/agenda">Lihat Agenda <Arrow /></a></div>
      </div>
      <div className="hero-image" role="img" aria-label="Perpustakaan komunitas yang rindang dengan kegiatan membaca dan berdiskusi"><div className="paper p1"/><div className="paper p2"/><div className="paper p3"/><span>ruang baca kebijakan</span></div>
    </section>

    <section className="ticker" aria-label="Sorotan">
      <a href="/riset-publikasi"><i>01</i><span><small>Kajian terbaru</small><strong>Pendidikan Digital dan Keadilan Akses</strong></span><Arrow /></a>
      <a href="/agenda"><i>02</i><span><small>Diskusi publik</small><strong>Sekolah, Negara, dan Masa Depan Demokrasi</strong></span><Arrow /></a>
    </section>

    <section className="intro section-shell">
      <p className="section-number">01 / Fokus Kami</p>
      <div><h2>Menghubungkan riset dengan kehidupan publik.</h2><p>Kebijakan pendidikan tidak seharusnya berhenti sebagai dokumen teknis. Kami mempertemukan penelitian, pengalaman masyarakat, dan perdebatan filosofis agar pilihan kebijakan dapat diperiksa secara terbuka.</p></div>
      <div className="pillars"><article><b>Riset kebijakan</b><p>Kajian independen yang kritis, kontekstual, dan dapat digunakan.</p></article><article><b>Literasi publik</b><p>Koleksi dan program baca yang membuat pengetahuan lebih mudah diakses.</p></article><article><b>Dialog demokratis</b><p>Forum yang mempertemukan peneliti, pendidik, warga, dan pembuat kebijakan.</p></article></div>
    </section>

    <section className="publication-section section-shell" id="kajian-terbaru">
      <div className="section-heading"><div><p className="section-number">02 / Terbitan Terbaru</p><h2>Gagasan untuk diperiksa, bukan sekadar diterima.</h2></div><a className="underlined" href="/riset-publikasi">Semua publikasi <Arrow /></a></div>
      <div className="publication-grid">{latest.map((item, index) => <article className="publication" key={item.title}><span className="publication-no">0{index + 1}</span><small>{item.type} · {item.date}</small><h3>{item.title}</h3><p>{item.text}</p><a href={item.href}>Baca materi <Arrow /></a></article>)}</div>
    </section>

    <section className="public-space">
      <div className="public-copy"><p className="section-number">03 / Ruang Pengetahuan</p><h2>Buku, perjumpaan, dan percakapan.</h2><p>Perpustakaan dan taman baca menjadi jembatan antara pengetahuan akademik dengan kebutuhan warga sehari-hari.</p></div>
      <a className="space-card library-card" href="/perpustakaan"><small>Perpustakaan</small><h3>Koleksi kebijakan, pendidikan, filsafat, dan ilmu sosial.</h3><span>Lihat koleksi <Arrow /></span></a>
      <a className="space-card reading-card" href="/taman-baca"><small>Taman Baca</small><h3>Ruang ramah keluarga untuk membaca dan belajar bersama.</h3><span>Lihat program <Arrow /></span></a>
    </section>

    <section className="agenda-home section-shell">
      <div className="section-heading"><div><p className="section-number">04 / Agenda</p><h2>Percakapan publik berikutnya.</h2></div><a className="underlined" href="/agenda">Lihat semua <Arrow /></a></div>
      <article className="event-feature"><div className="date-block"><strong>08</strong><span>AGU<br/>2026</span></div><div><small>Diskusi publik · Hibrida</small><h3>Sekolah, Negara, dan Masa Depan Demokrasi</h3><p>Bagaimana pendidikan dapat membentuk warga demokratis tanpa berubah menjadi alat indoktrinasi?</p></div><a className="primary" href="/agenda">Detail acara <Arrow /></a></article>
    </section>
  </main>;
}

