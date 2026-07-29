import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts" ADD COLUMN "main_agenda" boolean DEFAULT false;
    ALTER TABLE "_posts_v" ADD COLUMN "version_main_agenda" boolean DEFAULT false;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts" DROP COLUMN "main_agenda";
    ALTER TABLE "_posts_v" DROP COLUMN "version_main_agenda";
  `)
}
