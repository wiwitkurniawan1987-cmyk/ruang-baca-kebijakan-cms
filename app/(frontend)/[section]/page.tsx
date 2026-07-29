import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicNavigation, getPublishedPosts, type PublicMenu } from "../../../lib/cms";
import type { Media } from "../../../payload-types";

type Item = { eyebrow: string; title: string; description: string; meta?: string };
type PageData = { eyebrow: string; title: string; intro: string; featureTitle: string; featureText: string; items: Item[]; note: string };

const pages: Record<string, PageData> = {
  "riset-publikasi": {
    eyebrow: "Riset & Publikasi", title: "Kebijakan yang dibaca secara kritis.", intro: "Kami mengembangkan kajian pendidikan yang menjelaskan masalah, membuka perdebatan, dan menawarkan pilihan kebijakan tanpa menyederhanakan kenyataan.", featureTitle: "Pendidikan Digital dan Keadilan Akses", featureText: "Kajian awal tentang ketimpangan infrastruktur, kapasitas guru, tata kelola data, dan risiko ketika digitalisasi dipersempit menjadi pengadaan perangkat.", note: "Topik riset: keadilan pendidikan · kebijakan digital · agama dan sekolah · pilihan sekolah · pendidikan global",
    items: [
      { eyebrow: "Policy brief · Juli 2026", title: "Pendidikan Digital dan Keadilan Akses", description: "Empat pertanyaan yang perlu dijawab sebelum pemerintah memperluas investasi perangkat digital.", meta: "12 menit baca" },
      { eyebrow: "Working paper · Juni 2026", title: "Sekolah, Pilihan, dan Segregasi", description: "Menilai klaim efisiensi dan kebebasan memilih dari sudut keadilan sosial.", meta: "PDF · 28 halaman" },
      { eyebrow: "Esai kebijakan · Mei 2026", title: "Netralitas Guru di Ruang Kelas", description: "Mengapa keterbukaan posisi dapat lebih demokratis daripada netralitas yang semu.", meta: "9 menit baca" },
    ],
  },
  perpustakaan: {
    eyebrow: "Perpustakaan", title: "Koleksi untuk memahami pendidikan dan masyarakat.", intro: "Perpustakaan khusus yang mendukung peneliti, mahasiswa, guru, pegiat komunitas, dan warga yang ingin membaca persoalan pendidikan lebih dalam.", featureTitle: "Koleksi Pilihan: Keadilan Pendidikan", featureText: "Buku dan artikel pengantar tentang kesetaraan kesempatan, integrasi sekolah, kemampuan manusia, dan demokrasi pendidikan.", note: "Jam contoh: Selasa sampai Sabtu, 10.00 sampai 18.00 · Keanggotaan terbuka",
    items: [
      { eyebrow: "Rak 01", title: "Kebijakan & Tata Kelola", description: "Analisis kebijakan, ekonomi politik pendidikan, hukum pendidikan, dan administrasi publik.", meta: "420 judul" },
      { eyebrow: "Rak 02", title: "Filsafat & Keadilan", description: "Tujuan pendidikan, demokrasi, etika, pedagogi kritis, dan teori sosial.", meta: "285 judul" },
      { eyebrow: "Rak 03", title: "Agama & Masyarakat", description: "Sekularisme, pluralisme, pendidikan agama, identitas, dan hubungan negara dengan warga.", meta: "190 judul" },
    ],
  },
  "taman-baca": {
    eyebrow: "Taman Baca", title: "Membaca sebagai kegiatan bersama.", intro: "Ruang informal yang ramah anak dan keluarga, tempat buku menjadi awal bagi rasa ingin tahu, kreativitas, dan hubungan antargenerasi.", featureTitle: "Sabtu Membaca Bersama", featureText: "Sesi membaca nyaring, menggambar, dan percakapan sederhana untuk anak usia 6 sampai 12 tahun. Pendamping keluarga dipersilakan bergabung.", note: "Program contoh dijalankan bersama relawan. Buku anak dan fasilitator masih dapat ditambahkan.",
    items: [
      { eyebrow: "Setiap Sabtu · 10.30", title: "Baca Nyaring", description: "Cerita anak Indonesia dan dunia, dilanjutkan aktivitas kreatif.", meta: "Usia 6 sampai 9" },
      { eyebrow: "Sabtu kedua · 13.00", title: "Klub Penjelajah Buku", description: "Membaca nonfiksi ringan dan belajar mengajukan pertanyaan.", meta: "Usia 10 sampai 14" },
      { eyebrow: "Bulanan", title: "Orang Tua Membaca", description: "Percakapan tentang kebiasaan membaca di rumah tanpa tekanan akademik.", meta: "Untuk keluarga" },
    ],
  },
  agenda: {
    eyebrow: "Agenda", title: "Ruang untuk berbeda pendapat secara serius.", intro: "Diskusi publik, bedah buku, kelas pendek, dan forum warga yang mempertemukan penelitian dengan pengalaman nyata.", featureTitle: "Sekolah, Negara, dan Masa Depan Demokrasi", featureText: "Diskusi tentang pendidikan kewargaan, batas netralitas guru, kebebasan akademik, dan tanggung jawab sekolah dalam masyarakat yang terpolarisasi.", note: "Contoh lokasi: Ruang Baca Utama dan siaran daring · Registrasi akan dibuka setelah jadwal dikonfirmasi",
    items: [
      { eyebrow: "08 Agustus 2026 · Diskusi publik", title: "Sekolah, Negara, dan Masa Depan Demokrasi", description: "Forum panel dan tanya jawab terbuka.", meta: "Hibrida · 14.00" },
      { eyebrow: "22 Agustus 2026 · Bedah buku", title: "Mengapa Tujuan Pendidikan Diperdebatkan?", description: "Percakapan pengantar tentang human flourishing, efisiensi sosial, dan demokrasi.", meta: "Luring · 15.30" },
      { eyebrow: "05 September 2026 · Klinik riset", title: "Dari Masalah Publik ke Pertanyaan Penelitian", description: "Lokakarya kecil untuk mahasiswa dan peneliti pemula.", meta: "Terbatas 20 peserta" },
    ],
  },
  tentang: {
    eyebrow: "Tentang Kami", title: "Pusat studi yang bekerja bersama publik.", intro: "PSKP dirancang sebagai lembaga independen yang menggabungkan riset kebijakan, perpustakaan khusus, taman baca komunitas, dan forum diskusi.", featureTitle: "Misi Kami", featureText: "Menghasilkan pengetahuan yang dapat diuji, memperluas akses pada bacaan bermutu, dan membangun kebiasaan berdialog tentang persoalan pendidikan.", note: "Nama organisasi, alamat, susunan tim, dan mitra pada versi ini masih berupa ruang untuk diisi.",
    items: [
      { eyebrow: "Prinsip 01", title: "Independen", description: "Kesimpulan riset tidak ditentukan oleh kepentingan pendanaan atau afiliasi politik." },
      { eyebrow: "Prinsip 02", title: "Terbuka", description: "Argumen, sumber, batasan, dan kemungkinan sanggahan dijelaskan kepada publik." },
      { eyebrow: "Prinsip 03", title: "Berpihak pada keadilan", description: "Dampak kebijakan pada kelompok yang paling rentan menjadi pertimbangan utama." },
    ],
  },
};

export function generateStaticParams() { return Object.keys(pages).map(section => ({ section })); }
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
  return { title: menu?.label ?? pages[section]?.eyebrow ?? "Halaman" };
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const [menuItems, cmsPosts] = await Promise.all([
    getPublicNavigation(),
    getPublishedPosts({ sectionSlug: section }),
  ]);
  const menu = findMenu(menuItems, section);
  const page = pages[section];

  if (!page && !menu) notFound();

  if (cmsPosts.length === 1) {
    const post = cmsPosts[0];
    const image = typeof post.featuredImage === "object" ? post.featuredImage as Media : null;
    const attachment = typeof post.attachment === "object" ? post.attachment as Media : null;

    return <main className="article-page">
      <header className="article-header">
        <p className="eyebrow">{menu?.label ?? page?.eyebrow ?? post.contentType.replaceAll("-", " ")}</p>
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

  if (cmsPosts.length || (!page && menu)) {
    const first = cmsPosts[0];
    return <main className="inner-page">
      <header className="page-hero">
        <p className="eyebrow">{menu?.label ?? page?.eyebrow}</p>
        <h1>{menu?.label ?? page?.title}</h1>
        <p>{menu?.description || page?.intro || "Materi, artikel, dan publikasi terbaru dari Ruang Baca Kebijakan."}</p>
      </header>
      {first && <section className="feature-band">
        <div><small>Pilihan utama</small><h2>{first.title}</h2></div>
        <p>{first.excerpt}</p>
        <a className="underlined" href={`/artikel/${first.slug}`}>Baca materi <span>→</span></a>
      </section>}
      <section className="listing section-shell" id="daftar">
        <p className="section-number">Materi diterbitkan</p>
        {cmsPosts.length ? <div className="listing-grid">{cmsPosts.map((item, i) => <article key={item.id}>
          <span className="publication-no">{String(i + 1).padStart(2, "0")}</span>
          <small>{item.contentType.replaceAll("-", " ")} {item.publishedAt ? `· ${new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(item.publishedAt))}` : ""}</small>
          <h3>{item.title}</h3>
          <p>{item.excerpt}</p>
          <a className="underlined" href={`/artikel/${item.slug}`}>Baca selengkapnya <span>→</span></a>
        </article>)}</div> : <div className="empty-content"><h2>Belum ada materi yang diterbitkan.</h2><p>Admin dapat menambahkan artikel atau materi dari dashboard, lalu memilih menu ini sebagai tujuan.</p></div>}
      </section>
    </main>;
  }

  if (!page) notFound();
  return <main className="inner-page">
    <header className="page-hero"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.intro}</p></header>
    <section className="feature-band"><div><small>Pilihan utama</small><h2>{page.featureTitle}</h2></div><p>{page.featureText}</p><a className="underlined" href="#daftar">Pelajari lebih lanjut <span>→</span></a></section>
    <section className="listing section-shell" id="daftar"><p className="section-number">Daftar awal</p><div className="listing-grid">{page.items.map((item, i) => <article key={item.title}><span className="publication-no">0{i+1}</span><small>{item.eyebrow}</small><h3>{item.title}</h3><p>{item.description}</p>{item.meta && <b>{item.meta}</b>}</article>)}</div></section>
    <aside className="editorial-note"><span>Catatan pengembangan</span><p>{page.note}</p></aside>
    {section === "tentang" && <section className="contact-block" id="kontak"><p className="eyebrow">Kontak</p><h2>Mari membangun ruang pengetahuan ini bersama.</h2><p>Tambahkan alamat, email organisasi, nomor telepon, dan tautan media sosial resmi pada tahap berikutnya.</p></section>}
  </main>;
}
