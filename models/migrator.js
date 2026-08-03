import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

import { ServiceError } from "infra/errors";

const getDefaultMigrationRunnerConfig = (dbClient, dryRun = true) => ({
  dbClient,
  dir: resolve("infra", "migrations"),
  direction: "up",
  dryRun,
  verbose: true,
  migrationsTable: "pgmigrations",
});

async function migrate(liveRun) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const migrationRunnerConfig = getDefaultMigrationRunnerConfig(
      dbClient,
      !liveRun,
    );

    return await migrationRunner(migrationRunnerConfig);
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      message: "Erro na conexão com Banco ou na Query",
      cause: error,
    });
    throw serviceErrorObject;
  } finally {
    await dbClient?.end();
  }
}

const migrator = {
  listPendingMigrations: () => migrate(false),
  runPendingMigrations: () => migrate(true),
};

export default migrator;
