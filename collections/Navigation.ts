import type { CollectionConfig } from "payload";
import { populateSlug } from "../lib/slug";

export const Navigation: CollectionConfig = {
  slug: "navigation",
  labels: { singular: "Menu", plural: "Menu & Submenu" },
  admin: {
    useAsTitle: "label",
    group: "Struktur Website",
    defaultColumns: ["label", "parent", "order", "enabled"],
    description: "Kelola menu website. Kosongkan Menu induk untuk menu utama, atau pilih Menu induk untuk membuat submenu.",
  },
  defaultSort: "order",
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        const parentId = typeof data?.parent === "object" ? data.parent?.id : data?.parent;
        if (originalDoc?.id && parentId === originalDoc.id) {
          return { ...data, parent: null };
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "label",
      label: "Nama menu",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Alamat halaman",
      type: "text",
      required: true,
      unique: true,
      index: true,
      hooks: { beforeValidate: [populateSlug] },
      admin: {
        position: "sidebar",
        description: "Dibuat otomatis dari nama menu dan dapat disunting.",
      },
    },
    {
      name: "parent",
      label: "Menu induk",
      type: "relationship",
      relationTo: "navigation",
      admin: {
        position: "sidebar",
        description: "Kosongkan untuk menu utama. Untuk submenu, pilih menu utama tempat submenu ini akan dimasukkan.",
      },
    },
    {
      name: "order",
      label: "Urutan",
      type: "number",
      required: true,
      defaultValue: 10,
      admin: { position: "sidebar" },
    },
    {
      name: "enabled",
      label: "Tampilkan di website",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
    {
      name: "description",
      label: "Pengantar halaman",
      type: "textarea",
    },
    {
      name: "pageTitle",
      label: "Judul besar halaman",
      type: "textarea",
      admin: { description: "Jika kosong, nama menu akan digunakan sebagai judul halaman." },
    },
    {
      name: "featureTitle",
      label: "Judul bagian unggulan",
      type: "text",
    },
    {
      name: "featureDescription",
      label: "Isi bagian unggulan",
      type: "textarea",
    },
    {
      name: "note",
      label: "Catatan halaman",
      type: "textarea",
    },
  ],
};
