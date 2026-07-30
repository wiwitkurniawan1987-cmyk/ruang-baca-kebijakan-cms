import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

type FocusArticle = {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  sections: Array<{ heading: string; paragraphs: string[] }>
}

function lexicalContent(article: FocusArticle) {
  const text = (value: string) => ({
    type: 'text', version: 1, detail: 0, format: 0, mode: 'normal', style: '', text: value,
  })
  const children = article.sections.flatMap((section) => [
    {
      type: 'heading', tag: 'h2', version: 1, direction: 'ltr', format: '', indent: 0,
      children: [text(section.heading)],
    },
    ...section.paragraphs.map((value) => ({
      type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0,
      textFormat: 0, textStyle: '', children: [text(value)],
    })),
  ])
  return { root: { type: 'root', version: 1, direction: 'ltr', format: '', indent: 0, children } }
}

const focusArticles: FocusArticle[] = [
  {
    title: 'Riset Kebijakan untuk Kepentingan Publik',
    slug: 'riset-kebijakan-untuk-kepentingan-publik',
    excerpt: 'Kajian independen yang menjelaskan masalah, memeriksa bukti, dan membuka pilihan kebijakan kepada masyarakat.',
    publishedAt: '2026-07-27T09:00:00+07:00',
    sections: [
      {
        heading: 'Mengapa riset kebijakan diperlukan?',
        paragraphs: [
          'Kebijakan pendidikan memengaruhi kesempatan belajar, kerja guru, penggunaan anggaran, serta kehidupan keluarga. Keputusan yang berdampak luas membutuhkan lebih dari pendapat atau tren. Riset membantu menjelaskan masalah, menguji asumsi, dan memperlihatkan konsekuensi yang mungkin tidak terlihat pada awalnya.',
          'Bagi Ruang Baca Kebijakan, riset bukan kegiatan yang terpisah dari masyarakat. Pertanyaan penelitian harus berhubungan dengan pengalaman nyata, sementara hasilnya perlu ditulis dalam bahasa yang dapat diperiksa oleh warga.',
        ],
      },
      {
        heading: 'Cara kami bekerja',
        paragraphs: [
          'Kami memulai dari pemetaan masalah dan kelompok yang terdampak. Bukti kuantitatif digunakan untuk melihat pola, sedangkan wawancara, dokumen, dan pengalaman lapangan membantu memahami mekanisme serta konteks. Setiap metode dipilih berdasarkan pertanyaan, bukan karena sedang populer.',
          'Analisis selalu menyatakan sumber, batasan, ketidakpastian, dan kemungkinan penjelasan lain. Sikap independen tidak berarti tanpa nilai; itu berarti kesimpulan tidak ditentukan oleh kepentingan pendanaan, afiliasi, atau hasil yang diinginkan sejak awal.',
        ],
      },
      {
        heading: 'Dari temuan menuju pilihan',
        paragraphs: [
          'Riset kebijakan yang baik tidak hanya menunjukkan apa yang salah. Ia membandingkan beberapa pilihan, memperkirakan manfaat serta risiko, dan menjelaskan kebutuhan pelaksanaan. Rekomendasi harus mempertimbangkan kapasitas lembaga, beban kerja, biaya, hak warga, dan dampak pada kelompok rentan.',
          'Hasil kajian diterbitkan sebagai artikel, policy brief, working paper, dan bahan diskusi. Publik dapat membaca, mempertanyakan, serta mengusulkan koreksi. Dengan demikian, riset menjadi bagian dari percakapan publik yang berkelanjutan.',
        ],
      },
    ],
  },
  {
    title: 'Literasi Publik dan Akses Pengetahuan',
    slug: 'literasi-publik-dan-akses-pengetahuan',
    excerpt: 'Membuat pengetahuan kebijakan, buku, dan bahan belajar lebih mudah ditemukan, dipahami, dan digunakan.',
    publishedAt: '2026-07-26T09:00:00+07:00',
    sections: [
      {
        heading: 'Pengetahuan perlu dapat digunakan',
        paragraphs: [
          'Akses pengetahuan tidak selesai ketika sebuah laporan tersedia untuk diunduh. Bahasa yang terlalu teknis, biaya buku, keterbatasan perpustakaan, format yang tidak aksesibel, dan kurangnya waktu dapat membuat informasi tetap jauh dari masyarakat.',
          'Literasi publik berarti membantu warga menemukan sumber, memahami argumen, membedakan bukti dari klaim, dan menggunakan pengetahuan untuk mengambil keputusan atau berpartisipasi dalam pembahasan kebijakan.',
        ],
      },
      {
        heading: 'Perpustakaan sebagai ruang bersama',
        paragraphs: [
          'Perpustakaan Ruang Baca Kebijakan menghubungkan bacaan akademik dengan kebutuhan mahasiswa, guru, keluarga, peneliti, dan komunitas. Koleksi disusun secara tematik agar pembaca dapat memulai dari satu persoalan dan menemukan beragam pendekatan.',
          'Kegiatan pengantar koleksi, bedah buku, dan panduan membaca membantu pengguna yang belum terbiasa dengan literatur kebijakan. Pertanyaan dasar selalu diterima; tidak ada pengetahuan yang dianggap terlalu sederhana untuk dibicarakan.',
        ],
      },
      {
        heading: 'Literasi sejak kehidupan keluarga',
        paragraphs: [
          'Taman Baca memperluas gagasan literasi melalui kegiatan anak dan keluarga. Membaca nyaring, menggambar, bermain peran, dan bertanya membangun hubungan positif dengan buku tanpa tekanan akademik.',
          'Kami memandang literasi sebagai kemampuan memahami dunia dan berhubungan dengan orang lain. Karena itu, koleksi dan program perlu menghargai bahasa, pengalaman, usia, kemampuan, serta latar kehidupan yang beragam.',
        ],
      },
    ],
  },
  {
    title: 'Dialog Demokratis tentang Pendidikan',
    slug: 'dialog-demokratis-tentang-pendidikan',
    excerpt: 'Forum yang mempertemukan penelitian, pengalaman warga, dan perbedaan pandangan secara setara.',
    publishedAt: '2026-07-25T09:00:00+07:00',
    sections: [
      {
        heading: 'Mengapa dialog diperlukan?',
        paragraphs: [
          'Persoalan pendidikan mengandung perbedaan kepentingan dan nilai. Guru, peserta didik, keluarga, pemerintah, dan masyarakat dapat melihat masalah yang sama dari posisi berbeda. Keputusan yang baik membutuhkan ruang untuk mendengar perbedaan tersebut.',
          'Dialog demokratis bukan sekadar memberi kesempatan berbicara. Peserta perlu dapat mengajukan alasan, memeriksa bukti, menanggapi secara hormat, dan bersedia memperbaiki pandangan ketika menemukan informasi baru.',
        ],
      },
      {
        heading: 'Prinsip ruang percakapan',
        paragraphs: [
          'Setiap kegiatan menjaga martabat peserta, membedakan kritik gagasan dari serangan pribadi, dan memberi ruang bagi kelompok yang sering kurang terdengar. Fasilitator membantu memperjelas perbedaan tanpa memaksa kesepakatan semu.',
          'Argumen tidak dinilai dari jabatan pembicara, melainkan dari kejelasan alasan dan bukti. Pengalaman hidup diakui sebagai sumber pengetahuan, sekaligus ditempatkan dalam percakapan dengan data, sejarah, dan sudut pandang lain.',
        ],
      },
      {
        heading: 'Dari percakapan menuju pembelajaran publik',
        paragraphs: [
          'Diskusi publik, bedah buku, kelas pendek, dan forum warga dirancang agar peserta tidak hanya menerima informasi. Setiap pertemuan menghasilkan pertanyaan lanjutan, catatan pembelajaran, atau usulan kajian yang dapat dikembangkan.',
          'Tujuannya bukan membuat semua orang berpikir sama. Ruang dialog membantu masyarakat memahami letak perbedaan, menemukan kepentingan bersama, dan membangun kebiasaan mengambil keputusan secara lebih terbuka serta bertanggung jawab.',
        ],
      },
    ],
  },
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "navigation"
    SET "note" = 'Koleksi disusun berdasarkan tema dan diperbarui secara berkala. Hubungi pengelola untuk informasi akses dan peminjaman.', "updated_at" = now()
    WHERE "slug" = 'perpustakaan';
  `)
  await db.execute(sql`
    UPDATE "navigation"
    SET "note" = 'Program dirancang bersama relawan dan keluarga. Jadwal setiap kegiatan dapat dilihat pada materi program.', "updated_at" = now()
    WHERE "slug" = 'taman-baca';
  `)

  for (const article of focusArticles) {
    const content = JSON.stringify(lexicalContent(article))
    await db.execute(sql`
      INSERT INTO "posts" (
        "title", "slug", "section_id", "content_type", "excerpt", "content",
        "featured", "main_agenda", "published_at", "seo_title", "seo_description",
        "updated_at", "created_at", "_status"
      )
      SELECT
        ${article.title}, ${article.slug}, "navigation"."id",
        'article'::"public"."enum_posts_content_type", ${article.excerpt}, ${content}::jsonb,
        false, false, ${article.publishedAt}::timestamptz, ${article.title}, ${article.excerpt.slice(0, 160)},
        now(), ${article.publishedAt}::timestamptz, 'published'::"public"."enum_posts_status"
      FROM "navigation" WHERE "navigation"."slug" = 'fokus-kami' LIMIT 1
      ON CONFLICT ("slug") DO UPDATE SET
        "title" = EXCLUDED."title", "section_id" = EXCLUDED."section_id",
        "content_type" = EXCLUDED."content_type", "excerpt" = EXCLUDED."excerpt",
        "content" = EXCLUDED."content", "published_at" = EXCLUDED."published_at",
        "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description",
        "updated_at" = now(), "_status" = 'published'::"public"."enum_posts_status";
    `)

    await db.execute(sql`
      UPDATE "_posts_v" SET "latest" = false
      WHERE "parent_id" = (SELECT "id" FROM "posts" WHERE "slug" = ${article.slug} LIMIT 1)
        AND "latest" = true;
    `)

    await db.execute(sql`
      INSERT INTO "_posts_v" (
        "parent_id", "version_title", "version_slug", "version_section_id",
        "version_content_type", "version_excerpt", "version_content",
        "version_featured_image_id", "version_attachment_id",
        "version_event_date", "version_event_location", "version_featured",
        "version_main_agenda", "version_published_at", "version_seo_title",
        "version_seo_description", "version_updated_at", "version_created_at",
        "version__status", "created_at", "updated_at", "latest", "autosave"
      )
      SELECT
        "id", "title", "slug", "section_id",
        "content_type"::text::"public"."enum__posts_v_version_content_type",
        "excerpt", "content", "featured_image_id", "attachment_id",
        "event_date", "event_location", "featured", "main_agenda", "published_at",
        "seo_title", "seo_description", "updated_at", "created_at",
        "_status"::text::"public"."enum__posts_v_version_status",
        now(), now(), true, false
      FROM "posts" WHERE "slug" = ${article.slug} LIMIT 1;
    `)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {}
