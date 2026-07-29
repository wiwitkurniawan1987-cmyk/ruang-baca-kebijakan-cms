import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    INSERT INTO "navigation" ("label", "slug", "order", "enabled", "description") VALUES
      ('Fokus Kami', 'fokus-kami', 10, true, 'Bidang kerja, prinsip, dan fokus kajian Ruang Baca Kebijakan.'),
      ('Terbitan Terbaru', 'terbitan-terbaru', 20, true, 'Artikel, kajian, dan materi terbaru yang telah diterbitkan.'),
      ('Ruang Pengetahuan', 'ruang-pengetahuan', 30, true, 'Perpustakaan, taman baca, dan ruang belajar bersama.'),
      ('Agenda', 'agenda', 40, true, 'Diskusi publik, bedah buku, kelas pendek, dan forum warga.')
    ON CONFLICT ("slug") DO NOTHING;

    INSERT INTO "navigation" ("label", "slug", "parent_id", "order", "enabled", "description") VALUES
      ('Perpustakaan', 'perpustakaan', (SELECT "id" FROM "navigation" WHERE "slug" = 'ruang-pengetahuan' LIMIT 1), 31, true, 'Koleksi buku dan materi untuk memahami pendidikan dan masyarakat.'),
      ('Taman Baca', 'taman-baca', (SELECT "id" FROM "navigation" WHERE "slug" = 'ruang-pengetahuan' LIMIT 1), 32, true, 'Program membaca dan belajar bersama untuk anak serta keluarga.')
    ON CONFLICT ("slug") DO NOTHING;
  `)
}

export async function down({ db: _db }: MigrateDownArgs): Promise<void> {
  // Menu tidak dihapus saat rollback agar konten dan perubahan admin tetap aman.
}
