import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import { createRouter } from "next-connect";
import controller from "infra/controller";
import { ServiceError } from "infra/errors";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

const getDefaultMigrationRunnerConfig = (dbClient, dryRun = true) => ({
  dbClient,
  dir: resolve("infra", "migrations"),
  direction: "up",
  dryRun,
  verbose: true,
  migrationsTable: "pgmigrations",
});

async function getHandler(request, response) {
  const migrations = await migrate(false);

  response.status(200).json(migrations);
}

async function postHandler(request, response) {
  const migrations = await migrate(true);
  const statusCode = migrations.length > 0 ? 201 : 200;
  response.status(statusCode).json(migrations);
}

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
