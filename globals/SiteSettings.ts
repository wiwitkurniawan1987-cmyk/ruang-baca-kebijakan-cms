import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Identitas Website",
  admin: { group: "Struktur Website" },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "siteName", label: "Nama website", type: "text", required: true, defaultValue: "Ruang Baca Kebijakan" },
    { name: "organizationName", label: "Nama organisasi", type: "text", required: true, defaultValue: "Pusat Studi Kebijakan Pendidikan" },
    { name: "tagline", label: "Tagline", type: "textarea", defaultValue: "Riset yang jernih, bacaan yang terbuka, dan percakapan publik yang bermakna." },
    { name: "email", label: "Email kontak", type: "email" },
    { name: "phone", label: "Nomor telepon", type: "text" },
    { name: "address", label: "Alamat", type: "textarea" },
  ],
};
