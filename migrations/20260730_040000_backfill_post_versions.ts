import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Payload keeps the editable state of versioned collections in a separate
 * versions table. The initial CMS content was inserted directly into `posts`,
 * so it was visible on the public site but absent from the admin list.
 *
 * Backfill only documents that do not have any version yet. This makes the
 * migration idempotent and leaves all content created through the dashboard
 * untouched.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    INSERT INTO "_posts_v" (
      "parent_id",
      "version_title",
      "version_slug",
      "version_section_id",
      "version_content_type",
      "version_excerpt",
      "version_content",
      "version_featured_image_id",
      "version_attachment_id",
      "version_event_date",
      "version_event_location",
      "version_featured",
      "version_main_agenda",
      "version_published_at",
      "version_seo_title",
      "version_seo_description",
      "version_updated_at",
      "version_created_at",
      "version__status",
      "created_at",
      "updated_at",
      "latest",
      "autosave"
    )
    SELECT
      "posts"."id",
      "posts"."title",
      "posts"."slug",
      "posts"."section_id",
      "posts"."content_type"::text::"public"."enum__posts_v_version_content_type",
      "posts"."excerpt",
      "posts"."content",
      "posts"."featured_image_id",
      "posts"."attachment_id",
      "posts"."event_date",
      "posts"."event_location",
      "posts"."featured",
      "posts"."main_agenda",
      "posts"."published_at",
      "posts"."seo_title",
      "posts"."seo_description",
      "posts"."updated_at",
      "posts"."created_at",
      "posts"."_status"::text::"public"."enum__posts_v_version_status",
      now(),
      now(),
      true,
      false
    FROM "posts"
    WHERE NOT EXISTS (
      SELECT 1
      FROM "_posts_v"
      WHERE "_posts_v"."parent_id" = "posts"."id"
    );
  `)
}

// Version history is deliberately preserved if this migration is rolled back.
export async function down(_args: MigrateDownArgs): Promise<void> {}
