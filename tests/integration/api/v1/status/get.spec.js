import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous User", () => {
    test("Retrieving system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(responseBody.updated_at).toBeDefined();
      expect(responseBody.updated_at).toEqual(
        new Date(responseBody.updated_at).toISOString(),
      );

      const database = responseBody.dependencies.database;
      expect(database).toBeDefined();
      expect(database.version).toEqual(expect.any(Number));
      expect(database.version).toEqual(16.1);
      expect(database.max_connections).toEqual(expect.any(Number));
      expect(database.active_connections).toEqual(1);
    });
  });
});
