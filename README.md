# Ruang Baca Kebijakan

Website dan CMS untuk Pusat Studi Kebijakan Pendidikan. Frontend publik menggunakan Next.js, sedangkan dashboard pengelolaan konten menggunakan Payload CMS.

## Fitur CMS

- Login administrator dan editor di `/admin`
- Menu dan submenu dinamis
- Artikel dan materi dengan draft, jadwal terbit, serta riwayat versi
- Penempatan artikel ke menu atau submenu tertentu
- Media library untuk gambar dan PDF
- Gambar utama, lampiran, metadata SEO, dan live preview
- Identitas website, informasi kontak, dan footer yang dapat dikelola

## Menjalankan website

```bash
pnpm install
pnpm dev
```

Buka `http://localhost:3000/admin`. Pada penggunaan pertama, Payload akan meminta pembuatan akun administrator pertama.

## Data awal

```bash
pnpm seed
```

Perintah ini menambahkan menu awal, satu submenu Policy Brief, dan satu artikel contoh. Aman dijalankan ulang karena hanya bekerja ketika koleksi masih kosong.

## Pemeriksaan produksi

```bash
pnpm build
```

Sebelum dipublikasikan, ganti `PAYLOAD_SECRET` dan isi variabel produksi pada `.env.example`. Konfigurasi akan otomatis menggunakan PostgreSQL ketika `DATABASE_URL` diawali `postgres://` atau `postgresql://`, serta memindahkan unggahan media ke AWS S3 atau layanan kompatibel S3 seperti Cloudflare R2 ketika kredensial `S3_*` tersedia. Tanpa variabel tersebut, pengembangan lokal tetap memakai SQLite dan folder `public/media`.
