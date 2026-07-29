import type { CollectionConfig } from "payload";

const isAdmin = ({ req }: { req: { user: unknown } }) => {
  const user = req.user as { role?: string } | null;
  return user?.role === "admin";
};

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Pengguna", plural: "Pengguna" },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 8 * 60 * 60,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    group: "Administrasi",
  },
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: isAdmin,
    delete: isAdmin,
    read: ({ req }) => {
      if (isAdmin({ req })) return true;
      return req.user ? { id: { equals: req.user.id } } : false;
    },
    update: ({ req }) => {
      if (isAdmin({ req })) return true;
      return req.user ? { id: { equals: req.user.id } } : false;
    },
  },
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        if (operation === "create" && !req.user) {
          return { ...data, role: "admin" };
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "name",
      label: "Nama",
      type: "text",
      required: true,
    },
    {
      name: "role",
      label: "Peran",
      type: "select",
      required: true,
      defaultValue: "editor",
      saveToJWT: true,
      options: [
        { label: "Administrator", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      access: {
        update: isAdmin,
      },
    },
  ],
};
