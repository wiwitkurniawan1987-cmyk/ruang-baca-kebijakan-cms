import type { CollectionConfig } from "payload";
import { populateSlug } from "../lib/slug";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Artikel", plural: "Artikel & Materi" },
  admin: {
    useAsTitle: "title",
    group: "Konten",
    defaultColumns: ["title", "section", "_status", "publishedAt", "updatedAt"],
    description: "Tulis artikel atau materi, tambahkan gambar, lalu pilih menu atau submenu tujuan.",
    livePreview: {
      url: ({ data }) => `/artikel/${data.slug ?? ""}`,
    },
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
    },
    maxPerDoc: 30,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?._status === "published" && !data.publishedAt) {
          return { ...data, publishedAt: new Date().toISOString() };
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "title",
      label: "Judul",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Alamat artikel",
      type: "text",
      required: true,
      unique: true,
      index: true,
      hooks: { beforeValidate: [populateSlug] },
      admin: { position: "sidebar" },
    },
    {
      name: "section",
      label: "Menu / submenu tujuan",
      type: "relationship",
      relationTo: "navigation",
      required: true,
      admin: {
        position: "sidebar",
        description: "Artikel akan ditampilkan pada halaman menu atau submenu ini.",
      },
    },
    {
      name: "contentType",
      label: "Jenis materi",
      type: "select",
      required: true,
      defaultValue: "article",
      options: [
        { label: "Artikel", value: "article" },
        { label: "Policy brief", value: "policy-brief" },
        { label: "Working paper", value: "working-paper" },
        { label: "Agenda", value: "event" },
        { label: "Koleksi perpustakaan", value: "library" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "excerpt",
      label: "Ringkasan",
      type: "textarea",
      required: true,
      maxLength: 320,
    },
    {
      name: "content",
      label: "Isi materi",
      type: "richText",
      required: true,
    },
    {
      name: "featuredImage",
      label: "Gambar utama",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "attachment",
      label: "Lampiran PDF",
      type: "upload",
      relationTo: "media",
      filterOptions: { mimeType: { equals: "application/pdf" } },
    },
    {
      name: "featured",
      label: "Tampilkan sebagai sorotan",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      label: "Tanggal terbit",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      type: "collapsible",
      label: "Pengaturan mesin pencari",
      fields: [
        { name: "seoTitle", label: "Judul SEO", type: "text", maxLength: 70 },
        { name: "seoDescription", label: "Deskripsi SEO", type: "textarea", maxLength: 160 },
      ],
    },
  ],
};
