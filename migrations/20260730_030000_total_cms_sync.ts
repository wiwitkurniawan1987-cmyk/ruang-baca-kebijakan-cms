import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "navigation" ADD COLUMN "page_title" varchar;
    ALTER TABLE "navigation" ADD COLUMN "feature_title" varchar;
    ALTER TABLE "navigation" ADD COLUMN "feature_description" varchar;
    ALTER TABLE "navigation" ADD COLUMN "note" varchar;

    ALTER TABLE "posts" ADD COLUMN "event_date" timestamp(3) with time zone;
    ALTER TABLE "posts" ADD COLUMN "event_location" varchar;
    ALTER TABLE "_posts_v" ADD COLUMN "version_event_date" timestamp(3) with time zone;
    ALTER TABLE "_posts_v" ADD COLUMN "version_event_location" varchar;

    CREATE TABLE "homepage" (
      "id" serial PRIMARY KEY NOT NULL,
      "hero_eyebrow" varchar DEFAULT 'Ruang Baca Kebijakan · Riset · Diskusi' NOT NULL,
      "hero_title" varchar DEFAULT 'Kebijakan pendidikan yang berlandaskan riset dan berakar dalam kehidupan sosial' NOT NULL,
      "hero_description" varchar DEFAULT 'Pusat riset dan ruang belajar bersama untuk menghubungkan kajian kebijakan, koleksi bacaan, serta percakapan publik.' NOT NULL,
      "primary_button_label" varchar DEFAULT 'Jelajahi Kajian' NOT NULL,
      "primary_button_href" varchar DEFAULT '/terbitan-terbaru' NOT NULL,
      "secondary_button_label" varchar DEFAULT 'Lihat Agenda' NOT NULL,
      "secondary_button_href" varchar DEFAULT '/agenda' NOT NULL,
      "hero_image_id" integer,
      "focus_label" varchar DEFAULT '01 / Fokus Kami' NOT NULL,
      "focus_title" varchar DEFAULT 'Menghubungkan riset dengan kehidupan publik.' NOT NULL,
      "focus_description" varchar DEFAULT 'Kebijakan pendidikan tidak seharusnya berhenti sebagai dokumen teknis. Kami mempertemukan penelitian, pengalaman masyarakat, dan perdebatan filosofis agar pilihan kebijakan dapat diperiksa secara terbuka.' NOT NULL,
      "latest_label" varchar DEFAULT '02 / Terbitan Terbaru' NOT NULL,
      "latest_title" varchar DEFAULT 'Gagasan untuk diperiksa, bukan sekadar diterima.' NOT NULL,
      "main_agenda_label" varchar DEFAULT '03 / Agenda Utama' NOT NULL,
      "main_agenda_title" varchar DEFAULT 'Pertemuan dan percakapan pilihan.' NOT NULL,
      "main_agenda_description" varchar DEFAULT 'Agenda utama yang mempertemukan peneliti, pendidik, warga, dan pembuat kebijakan dalam dialog terbuka.' NOT NULL,
      "agenda_label" varchar DEFAULT '04 / Agenda' NOT NULL,
      "agenda_title" varchar DEFAULT 'Percakapan publik berikutnya.' NOT NULL,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE "homepage_focus_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL
    );

    ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "homepage_focus_items" ADD CONSTRAINT "homepage_focus_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "homepage_hero_image_idx" ON "homepage" USING btree ("hero_image_id");
    CREATE INDEX "homepage_focus_items_order_idx" ON "homepage_focus_items" USING btree ("_order");
    CREATE INDEX "homepage_focus_items_parent_id_idx" ON "homepage_focus_items" USING btree ("_parent_id");

    INSERT INTO "homepage" ("id", "updated_at", "created_at") VALUES (1, now(), now()) ON CONFLICT ("id") DO NOTHING;
    INSERT INTO "homepage_focus_items" ("_order", "_parent_id", "id", "title", "description") VALUES
      (1, 1, 'focus-riset-kebijakan', 'Riset kebijakan', 'Kajian independen yang kritis, kontekstual, dan dapat digunakan.'),
      (2, 1, 'focus-literasi-publik', 'Literasi publik', 'Koleksi dan program baca yang membuat pengetahuan lebih mudah diakses.'),
      (3, 1, 'focus-dialog-demokratis', 'Dialog demokratis', 'Forum yang mempertemukan peneliti, pendidik, warga, dan pembuat kebijakan.')
    ON CONFLICT ("id") DO NOTHING;

    UPDATE "navigation" SET
      "page_title" = 'Menghubungkan riset dengan kehidupan publik.',
      "description" = 'Kebijakan pendidikan tidak seharusnya berhenti sebagai dokumen teknis. Kami mempertemukan penelitian, pengalaman masyarakat, dan perdebatan filosofis agar pilihan kebijakan dapat diperiksa secara terbuka.'
    WHERE "slug" = 'fokus-kami' AND "page_title" IS NULL;

    UPDATE "navigation" SET
      "page_title" = 'Gagasan untuk diperiksa, bukan sekadar diterima.',
      "description" = 'Artikel, kajian, dan materi yang telah diterbitkan melalui dashboard.'
    WHERE "slug" = 'terbitan-terbaru' AND "page_title" IS NULL;

    UPDATE "navigation" SET
      "page_title" = 'Buku, perjumpaan, dan percakapan.',
      "description" = 'Perpustakaan dan taman baca menjadi jembatan antara pengetahuan akademik dengan kebutuhan warga sehari-hari.'
    WHERE "slug" = 'ruang-pengetahuan' AND "page_title" IS NULL;

    UPDATE "navigation" SET
      "page_title" = 'Koleksi untuk memahami pendidikan dan masyarakat.',
      "description" = 'Perpustakaan khusus yang mendukung peneliti, mahasiswa, guru, pegiat komunitas, dan warga yang ingin membaca persoalan pendidikan lebih dalam.',
      "feature_title" = 'Koleksi Pilihan: Keadilan Pendidikan',
      "feature_description" = 'Buku dan artikel pengantar tentang kesetaraan kesempatan, integrasi sekolah, kemampuan manusia, dan demokrasi pendidikan.',
      "note" = 'Jam contoh: Selasa sampai Sabtu, 10.00 sampai 18.00 · Keanggotaan terbuka'
    WHERE "slug" = 'perpustakaan' AND "page_title" IS NULL;

    UPDATE "navigation" SET
      "page_title" = 'Membaca sebagai kegiatan bersama.',
      "description" = 'Ruang informal yang ramah anak dan keluarga, tempat buku menjadi awal bagi rasa ingin tahu, kreativitas, dan hubungan antargenerasi.',
      "feature_title" = 'Sabtu Membaca Bersama',
      "feature_description" = 'Sesi membaca nyaring, menggambar, dan percakapan sederhana untuk anak usia 6 sampai 12 tahun. Pendamping keluarga dipersilakan bergabung.',
      "note" = 'Program dikelola bersama relawan. Buku anak dan fasilitator masih dapat ditambahkan.'
    WHERE "slug" = 'taman-baca' AND "page_title" IS NULL;

    UPDATE "navigation" SET
      "page_title" = 'Ruang untuk berbeda pendapat secara serius.',
      "description" = 'Diskusi publik, bedah buku, kelas pendek, dan forum warga yang mempertemukan penelitian dengan pengalaman nyata.',
      "feature_title" = 'Sekolah, Negara, dan Masa Depan Demokrasi',
      "feature_description" = 'Diskusi tentang pendidikan kewargaan, batas netralitas guru, kebebasan akademik, dan tanggung jawab sekolah dalam masyarakat yang terpolarisasi.'
    WHERE "slug" = 'agenda' AND "page_title" IS NULL;

    WITH seed (title, slug, section_slug, content_type, excerpt, event_date, event_location, days_ago) AS (VALUES
      ('Kebijakan & Tata Kelola', 'kebijakan-tata-kelola', 'perpustakaan', 'library', 'Analisis kebijakan, ekonomi politik pendidikan, hukum pendidikan, dan administrasi publik.', NULL::timestamptz, NULL::varchar, 9),
      ('Filsafat & Keadilan', 'filsafat-dan-keadilan', 'perpustakaan', 'library', 'Tujuan pendidikan, demokrasi, etika, pedagogi kritis, dan teori sosial.', NULL::timestamptz, NULL::varchar, 8),
      ('Agama & Masyarakat', 'agama-dan-masyarakat', 'perpustakaan', 'library', 'Sekularisme, pluralisme, pendidikan agama, identitas, dan hubungan negara dengan warga.', NULL::timestamptz, NULL::varchar, 7),
      ('Baca Nyaring', 'baca-nyaring', 'taman-baca', 'event', 'Cerita anak Indonesia dan dunia, dilanjutkan aktivitas kreatif.', NULL::timestamptz, 'Setiap Sabtu · 10.30', 6),
      ('Klub Penjelajah Buku', 'klub-penjelajah-buku', 'taman-baca', 'event', 'Membaca nonfiksi ringan dan belajar mengajukan pertanyaan.', NULL::timestamptz, 'Sabtu kedua · 13.00', 5),
      ('Orang Tua Membaca', 'orang-tua-membaca', 'taman-baca', 'event', 'Percakapan tentang kebiasaan membaca di rumah tanpa tekanan akademik.', NULL::timestamptz, 'Bulanan', 4),
      ('Sekolah, Negara, dan Masa Depan Demokrasi', 'sekolah-negara-dan-masa-depan-demokrasi', 'agenda', 'event', 'Forum panel dan tanya jawab terbuka tentang pendidikan dan demokrasi.', '2026-08-08 14:00:00+07'::timestamptz, 'Hibrida', 3),
      ('Mengapa Tujuan Pendidikan Diperdebatkan?', 'mengapa-tujuan-pendidikan-diperdebatkan', 'agenda', 'event', 'Percakapan pengantar tentang human flourishing, efisiensi sosial, dan demokrasi.', '2026-08-22 15:30:00+07'::timestamptz, 'Luring', 2),
      ('Dari Masalah Publik ke Pertanyaan Penelitian', 'dari-masalah-publik-ke-pertanyaan-penelitian', 'agenda', 'event', 'Lokakarya kecil untuk mahasiswa dan peneliti pemula.', '2026-09-05 13:00:00+07'::timestamptz, 'Terbatas 20 peserta', 1)
    )
    INSERT INTO "posts" ("title", "slug", "section_id", "content_type", "excerpt", "content", "event_date", "event_location", "published_at", "updated_at", "created_at", "_status")
    SELECT
      seed.title,
      seed.slug,
      navigation.id,
      seed.content_type::"public"."enum_posts_content_type",
      seed.excerpt,
      jsonb_build_object('root', jsonb_build_object(
        'type', 'root', 'version', 1, 'direction', 'ltr', 'format', '', 'indent', 0,
        'children', jsonb_build_array(jsonb_build_object(
          'type', 'paragraph', 'version', 1, 'direction', 'ltr', 'format', '', 'indent', 0,
          'textFormat', 0, 'textStyle', '',
          'children', jsonb_build_array(jsonb_build_object(
            'type', 'text', 'version', 1, 'detail', 0, 'format', 0, 'mode', 'normal', 'style', '', 'text', seed.excerpt
          ))
        ))
      )),
      seed.event_date,
      seed.event_location,
      now() - make_interval(days => seed.days_ago),
      now(),
      now() - make_interval(days => seed.days_ago),
      'published'::"public"."enum_posts_status"
    FROM seed
    JOIN "navigation" ON "navigation"."slug" = seed.section_slug
    ON CONFLICT ("slug") DO NOTHING;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "posts" WHERE "slug" IN (
      'kebijakan-tata-kelola', 'filsafat-dan-keadilan', 'agama-dan-masyarakat',
      'baca-nyaring', 'klub-penjelajah-buku', 'orang-tua-membaca',
      'sekolah-negara-dan-masa-depan-demokrasi', 'mengapa-tujuan-pendidikan-diperdebatkan',
      'dari-masalah-publik-ke-pertanyaan-penelitian'
    );
    DROP TABLE "homepage_focus_items" CASCADE;
    DROP TABLE "homepage" CASCADE;
    ALTER TABLE "_posts_v" DROP COLUMN "version_event_location";
    ALTER TABLE "_posts_v" DROP COLUMN "version_event_date";
    ALTER TABLE "posts" DROP COLUMN "event_location";
    ALTER TABLE "posts" DROP COLUMN "event_date";
    ALTER TABLE "navigation" DROP COLUMN "note";
    ALTER TABLE "navigation" DROP COLUMN "feature_description";
    ALTER TABLE "navigation" DROP COLUMN "feature_title";
    ALTER TABLE "navigation" DROP COLUMN "page_title";
  `)
}
