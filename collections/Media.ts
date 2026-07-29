import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Media", plural: "Pustaka Media" },
  admin: {
    useAsTitle: "alt",
    group: "Konten",
    defaultColumns: ["filename", "alt", "mimeType", "updatedAt"],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*", "application/pdf"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 900, height: 600, position: "centre" },
      { name: "hero", width: 1600, height: 900, position: "centre" },
    ],
  },
  fields: [
    {
      name: "alt",
      label: "Teks alternatif",
      type: "text",
      required: true,
      admin: {
        description: "Jelaskan isi gambar untuk aksesibilitas dan mesin pencari.",
      },
    },
    {
      name: "caption",
      label: "Keterangan",
      type: "textarea",
    },
  ],
};
