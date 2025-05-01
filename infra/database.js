import { Client } from "pg";

async function query(queryObject) {
  let client;

  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLConfig(),
  });
  await client.connect();
  return client;
}

function getSSLConfig() {
  const ca = process.env.POSTGRES_CA;

  if (ca) return { ca };

  return process.env.NODE_ENV === "production";
}

const database = { query, getNewClient };

export default database;
