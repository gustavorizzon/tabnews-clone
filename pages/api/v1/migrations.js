import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

const getDefaultMigrationRunnerConfig = (dbClient, dryRun = true) => ({
  dbClient,
  dir: join("infra", "migrations"),
  direction: "up",
  dryRun,
  verbose: true,
  migrationsTable: "pgmigrations",
});

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).end();
  }

  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const liveRun = request.method === "POST";
    const migrationRunnerConfig = getDefaultMigrationRunnerConfig(
      dbClient,
      !liveRun,
    );
    const migrations = await migrationRunner(migrationRunnerConfig);
    const statusCode = liveRun && migrations.length > 0 ? 201 : 200;
    return response.status(statusCode).json(migrations);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
