import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "navigation"
    SET "parent_id" = NULL, "updated_at" = now()
    WHERE "parent_id" = "id";
  `)
}

export async function down({ db: _db }: MigrateDownArgs): Promise<void> {
  // Relasi induk yang tidak valid tidak dikembalikan saat rollback.
}
