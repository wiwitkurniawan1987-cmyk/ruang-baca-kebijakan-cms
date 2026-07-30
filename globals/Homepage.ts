import type { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Pengaturan Beranda",
  admin: {
    group: "Struktur Website",
    description: "Semua judul dan pengantar beranda dikelola di sini. Kartu artikel tetap dikelola melalui Artikel & Materi.",
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: "collapsible",
      label: "Bagian pembuka",
      fields: [
        { name: "heroEyebrow", label: "Teks kecil", type: "text", required: true, defaultValue: "Ruang Baca Kebijakan · Riset · Diskusi" },
        { name: "heroTitle", label: "Judul utama", type: "textarea", required: true, defaultValue: "Kebijakan pendidikan yang berlandaskan riset dan berakar dalam kehidupan sosial" },
        { name: "heroDescription", label: "Pengantar", type: "textarea", required: true, defaultValue: "Pusat riset dan ruang belajar bersama untuk menghubungkan kajian kebijakan, koleksi bacaan, serta percakapan publik." },
        { name: "primaryButtonLabel", label: "Teks tombol utama", type: "text", required: true, defaultValue: "Jelajahi Kajian" },
        { name: "primaryButtonHref", label: "Tujuan tombol utama", type: "text", required: true, defaultValue: "/terbitan-terbaru" },
        { name: "secondaryButtonLabel", label: "Teks tombol kedua", type: "text", required: true, defaultValue: "Lihat Agenda" },
        { name: "secondaryButtonHref", label: "Tujuan tombol kedua", type: "text", required: true, defaultValue: "/agenda" },
        { name: "heroImage", label: "Gambar pembuka", type: "upload", relationTo: "media" },
      ],
    },
    {
      type: "collapsible",
      label: "Fokus Kami",
      fields: [
        { name: "focusLabel", label: "Label bagian", type: "text", required: true, defaultValue: "01 / Fokus Kami" },
        { name: "focusTitle", label: "Judul", type: "textarea", required: true, defaultValue: "Menghubungkan riset dengan kehidupan publik." },
        { name: "focusDescription", label: "Pengantar", type: "textarea", required: true, defaultValue: "Kebijakan pendidikan tidak seharusnya berhenti sebagai dokumen teknis. Kami mempertemukan penelitian, pengalaman masyarakat, dan perdebatan filosofis agar pilihan kebijakan dapat diperiksa secara terbuka." },
        {
          name: "focusItems",
          label: "Daftar fokus",
          type: "array",
          maxRows: 6,
          fields: [
            { name: "title", label: "Judul", type: "text", required: true },
            { name: "description", label: "Keterangan", type: "textarea", required: true },
          ],
        },
      ],
    },
    {
      type: "collapsible",
      label: "Terbitan Terbaru",
      fields: [
        { name: "latestLabel", label: "Label bagian", type: "text", required: true, defaultValue: "02 / Terbitan Terbaru" },
        { name: "latestTitle", label: "Judul", type: "textarea", required: true, defaultValue: "Gagasan untuk diperiksa, bukan sekadar diterima." },
      ],
    },
    {
      type: "collapsible",
      label: "Agenda Utama",
      fields: [
        { name: "mainAgendaLabel", label: "Label bagian", type: "text", required: true, defaultValue: "03 / Agenda Utama" },
        { name: "mainAgendaTitle", label: "Judul", type: "textarea", required: true, defaultValue: "Pertemuan dan percakapan pilihan." },
        { name: "mainAgendaDescription", label: "Pengantar", type: "textarea", required: true, defaultValue: "Agenda utama yang mempertemukan peneliti, pendidik, warga, dan pembuat kebijakan dalam dialog terbuka." },
      ],
    },
    {
      type: "collapsible",
      label: "Agenda",
      fields: [
        { name: "agendaLabel", label: "Label bagian", type: "text", required: true, defaultValue: "04 / Agenda" },
        { name: "agendaTitle", label: "Judul", type: "textarea", required: true, defaultValue: "Percakapan publik berikutnya." },
      ],
    },
  ],
};
