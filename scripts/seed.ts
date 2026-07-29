import config from "@payload-config";
import { getPayload } from "payload";

const payload = await getPayload({ config });

const navigationCount = await payload.count({ collection: "navigation" });

if (navigationCount.totalDocs === 0) {
  const riset = await payload.create({
    collection: "navigation",
    data: {
      label: "Riset & Publikasi",
      slug: "riset-publikasi",
      order: 10,
      enabled: true,
      description: "Kajian pendidikan yang menjelaskan masalah, membuka perdebatan, dan menawarkan pilihan kebijakan.",
    },
  });

  const policyBrief = await payload.create({
    collection: "navigation",
    data: {
      label: "Policy Brief",
      slug: "policy-brief",
      parent: riset.id,
      order: 11,
      enabled: true,
      description: "Ringkasan kebijakan yang singkat, berbasis bukti, dan mudah digunakan.",
    },
  });

  await Promise.all([
    ["Perpustakaan", "perpustakaan", 20, "Koleksi buku dan materi untuk memahami pendidikan dan masyarakat."],
    ["Taman Baca", "taman-baca", 30, "Program membaca dan belajar bersama untuk anak serta keluarga."],
    ["Agenda", "agenda", 40, "Diskusi publik, bedah buku, kelas pendek, dan forum warga."],
    ["Tentang Kami", "tentang", 50, "Informasi tentang Pusat Studi Kebijakan Pendidikan dan cara menghubungi kami."],
  ].map(([label, slug, order, description]) => payload.create({
    collection: "navigation",
    data: {
      label: String(label),
      slug: String(slug),
      order: Number(order),
      enabled: true,
      description: String(description),
    },
  })));

  const postsCount = await payload.count({ collection: "posts" });
  if (postsCount.totalDocs === 0) {
    await payload.create({
      collection: "posts",
      draft: false,
      data: {
        title: "Mengelola Konten Ruang Baca Kebijakan",
        slug: "mengelola-konten-ruang-baca-kebijakan",
        section: policyBrief.id,
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
