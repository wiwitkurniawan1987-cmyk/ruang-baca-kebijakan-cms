import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "users"
    SET
      "salt" = '6e599cba0a9140b20cae1ac24e55dd7f57bd1d74a64748823b1a77659d68836a',
      "hash" = '4ef19ba211b101e9fa618576ad39ad55a43b0fa267d29a73f4293ac7c3968644bc5489eee0f637207a3a976dd57f0fad74c30024d62a2efd6903e02e9fbdbefb8746bfd15508f38fe7ac325f6bb5aa31002fbd40628ebce24ab0eccad29aeb8d86972d3241d80a78f88bea7fae72e05cbd11455e1042d4057fb15a470f39b7a7cb0986a9dc18d6e33517ff3766ed3e474f302ad7a5e9225f95e1221bdb9b902bb0f05617f24d56ce6b688eeed8597f8dcc46648c87f66b2fae30a217ba50bfecb3daf1bc943f1c08587a251c713c4cc319ebf237c9ccacf30ebbe543286aa67445a99d0ad7b90c1a89d3bf706181140a98b99703938a8b12f2649384fd5aa817091fdbd0a40dc9a038c1454184bbe3848e1e57843f77bed9258c4a5047b0964edc80daab90402491b4bd94aec8beeffc57fa72c771842c1530fa85b35d3ed4f4621e48417e165c11d988d7f983395048f6df97ad62925832a187a73c52e70d261c2f331e4078fa576e77bd49ae45a1204fcc8ed88ef02b673621f6425646d947fb3f8d192b8eb6beee596337512975bc4a7dec40a902883de79f9dee6d4b5a85ffc347223b193d044afbe3f731ed11266992702fe2c4da4bf3e0552a94930cb4062dd2cb4b52adffc5f78982aafa0647c2ecf998572c8298d03a53774d43f687a2471c76e2702ed2b41c5be89e4045f1034330c88e4cf8ba8fe0a43d1ffb030b',
      "reset_password_token" = NULL,
      "reset_password_expiration" = NULL,
      "login_attempts" = 0,
      "lock_until" = NULL,
      "updated_at" = now()
    WHERE lower("email") = lower('wikurnia@iu.edu');
  `)
}

export async function down({ db: _db }: MigrateDownArgs): Promise<void> {
  // Password lama tidak dapat dan tidak boleh dipulihkan.
}
