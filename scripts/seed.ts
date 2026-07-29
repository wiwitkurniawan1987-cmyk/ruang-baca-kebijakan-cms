import config from "@payload-config";
import { getPayload } from "payload";

const payload = await getPayload({ config });

const navigationCount = await payload.count({ collection: "navigation" });

if (navigationCount.totalDocs === 0) {
  await payload.create({
    collection: "navigation",
    data: {
      label: "Fokus Kami",
      slug: "fokus-kami",
      order: 10,
      enabled: true,
      description: "Bidang kerja, prinsip, dan fokus kajian Ruang Baca Kebijakan.",
    },
  });

  const publications = await payload.create({
    collection: "navigation",
    data: {
      label: "Terbitan Terbaru",
      slug: "terbitan-terbaru",
      order: 20,
      enabled: true,
      description: "Artikel, kajian, dan materi terbaru yang telah diterbitkan.",
    },
  });

  const knowledge = await payload.create({
    collection: "navigation",
    data: {
      label: "Ruang Pengetahuan",
      slug: "ruang-pengetahuan",
      order: 30,
      enabled: true,
      description: "Perpustakaan, taman baca, dan ruang belajar bersama.",
    },
  });

  await Promise.all([
    ["Perpustakaan", "perpustakaan", 31, "Koleksi buku dan materi untuk memahami pendidikan dan masyarakat."],
    ["Taman Baca", "taman-baca", 32, "Program membaca dan belajar bersama untuk anak serta keluarga."],
  ].map(([label, slug, order, description]) => payload.create({
    collection: "navigation",
    data: { label: String(label), slug: String(slug), parent: knowledge.id, order: Number(order), enabled: true, description: String(description) },
  })));

  await payload.create({
    collection: "navigation",
    data: { label: "Agenda", slug: "agenda", order: 40, enabled: true, description: "Diskusi publik, bedah buku, kelas pendek, dan forum warga." },
  });

  const postsCount = await payload.count({ collection: "posts" });
  if (postsCount.totalDocs === 0) {
    await payload.create({
      collection: "posts",
      draft: false,
      data: {
        title: "Mengelola Konten Ruang Baca Kebijakan",
        slug: "mengelola-konten-ruang-baca-kebijakan",
        section: publications.id,
        contentType: "article",
        excerpt: "Contoh materi pertama yang menunjukkan bagaimana artikel dapat diterbitkan dan ditempatkan pada submenu tertentu melalui dashboard.",
        _status: "published",
        publishedAt: new Date().toISOString(),
        content: {
          root: {
            type: "root",
            version: 1,
            direction: "ltr",
            format: "",
            indent: 0,
            children: [
              {
                type: "paragraph",
                version: 1,
                direction: "ltr",
                format: "",
                indent: 0,
                textFormat: 0,
                textStyle: "",
                children: [
                  {
                    type: "text",
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Artikel ini adalah contoh awal. Setelah membuat akun administrator, Anda dapat menyunting atau menghapusnya, mengunggah gambar, serta menambahkan materi baru dari dashboard.",
                  },
                ],
              },
            ],
          },
        },
      },
    });
  }
}

payload.logger.info("Data awal Ruang Baca Kebijakan siap digunakan.");
process.exit(0);
