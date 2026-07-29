const databaseVariableCandidates = [
  "DATABASE_URL",
  "DATABASE_URL_UNPOOLED",
  "POSTGRES_URL",
  "POSTGRES_URL_NON_POOLING",
  "POSTGRES_URL_UNPOOLED",
  "STORAGE_URL",
  "NEON_DATABASE_URL",
];

export function GET() {
  const detected = databaseVariableCandidates.filter((name) => Boolean(process.env[name]));
  const related = Object.keys(process.env)
    .filter(
      (name) =>
        /(DATABASE|POSTGRES|NEON|STORAGE.*URL)/i.test(name) &&
        !/(PASSWORD|SECRET|TOKEN|KEY)/i.test(name),
    )
    .sort();

  return Response.json({
    ok: true,
    detected,
    related,
  });
}
