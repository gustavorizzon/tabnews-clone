import { createRouter } from "next-connect";
import controller from "infra/controller";
import migrator from "models/migrator";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const migrations = await migrator.listPendingMigrations();
  response.status(200).json(migrations);
}

async function postHandler(request, response) {
  const migrations = await migrator.runPendingMigrations();
  const statusCode = migrations.length > 0 ? 201 : 200;
  response.status(statusCode).json(migrations);
}
