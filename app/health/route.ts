const databaseVariableCandidates = [
  "DATABASE_URL",
  "DATABASE_URL_UNPOOLED",
  "POSTGRES_URL",
  "POSTGRES_URL_NON_POOLING",
  "POSTGRES_URL_UNPOOLED",
  "STORAGE_URL",
  "NEON_DATABASE_URL",
];

function sanitizeError(error: unknown) {
  const details = error as {
    cause?: unknown;
    code?: unknown;
    message?: unknown;
    name?: unknown;
  };
  const message = String(details?.message || error || "Unknown database error")
    .replace(/postgres(?:ql)?:\/\/[^\s"'`]+/gi, "[redacted-database-url]")
    .replace(/password=[^&\s]+/gi, "password=[redacted]");

  return {
    name: typeof details?.name === "string" ? details.name : undefined,
    code: typeof details?.code === "string" ? details.code : undefined,
    message,
  };
}

export async function GET() {
  const detected = databaseVariableCandidates.filter((name) => Boolean(process.env[name]));
  const related = Object.keys(process.env)
    .filter(
      (name) =>
        /(DATABASE|POSTGRES|NEON|STORAGE.*URL)/i.test(name) &&
        !/(PASSWORD|SECRET|TOKEN|KEY)/i.test(name),
    )
    .sort();

  try {
    const [{ default: configPromise }, { getPayload }] = await Promise.all([
      import("@payload-config"),
      import("payload"),
    ]);
    const payload = await getPayload({ config: configPromise });
    const users = await payload.find({
      collection: "users",
      depth: 0,
      limit: 1,
    });

    return Response.json({
      ok: true,
      detected,
      related,
      database: {
        ok: true,
        users: users.totalDocs,
      },
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        detected,
        related,
        database: {
          ok: false,
          error: sanitizeError(error),
        },
      },
      { status: 500 },
    );
  }
}
