import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "./collections/Media";
import { Navigation } from "./collections/Navigation";
import { Posts } from "./collections/Posts";
import { Users } from "./collections/Users";
import { SiteSettings } from "./globals/SiteSettings";
import { Homepage } from "./globals/Homepage";
import { migrations } from "./migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const databaseURL =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  "file:./ruang-baca-kebijakan.sqlite";
const usesPostgres = /^(postgres|postgresql):\/\//.test(databaseURL);
const cloudStorageEnabled = Boolean(
  process.env.S3_BUCKET &&
  process.env.S3_ACCESS_KEY_ID &&
  process.env.S3_SECRET_ACCESS_KEY,
);
const databaseAdapter = usesPostgres
  ? postgresAdapter({
      pool: { connectionString: databaseURL },
      prodMigrations: migrations,
    })
  : (await import("@payloadcms/db-sqlite")).sqliteAdapter({
      client: { url: databaseURL },
      wal: true,
    });

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: "– Ruang Baca Kebijakan",
      description: "Dashboard pengelolaan konten Ruang Baca Kebijakan",
    },
  },
  collections: [Users, Navigation, Posts, Media],
  globals: [SiteSettings, Homepage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "local-only-ruang-baca-secret-change-before-production",
  db: databaseAdapter,
  plugins: [
    s3Storage({
      enabled: cloudStorageEnabled,
      collections: {
        media: {
          prefix: "media",
          disablePayloadAccessControl: true,
        },
      },
      bucket: process.env.S3_BUCKET || "",
      clientUploads: true,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        endpoint: process.env.S3_ENDPOINT || undefined,
        forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
        region: process.env.S3_REGION || "auto",
      },
    }),
  ],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
