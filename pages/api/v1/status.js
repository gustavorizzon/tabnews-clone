import { createRouter } from "next-connect";
import database from "infra/database.js";
import controller from "infra/controller";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();
  const dbStatusResult = await database.query({
    text: `
      SELECT
        current_setting('server_version')::float as version,
        current_setting('max_connections')::int AS max_connections,
        count(*)::int as active_connections
      FROM pg_stat_activity
      WHERE datname = $1;
    `,
    values: [process.env.POSTGRES_DB],
  });

  const [dbStatus] = dbStatusResult.rows;

  return response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbStatus.version,
        max_connections: dbStatus.max_connections,
        active_connections: dbStatus.active_connections,
      },
    },
  });
}
