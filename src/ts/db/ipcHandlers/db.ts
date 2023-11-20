import { ipcMain } from "electron";
import { Client } from "pg";

let client: Client;
let isOpeningConnection = false;

ipcMain.handle(
  "openDbConnectionIfNecessary",
  async (event, connectionString) => {
    if (client) return "open";
    if (isOpeningConnection) return "opening";
    client = new Client({
      connectionString: connectionString,
      ssl: true,
    });
    isOpeningConnection = true;
    await client.connect();
    isOpeningConnection = false;
    return "open";
  }
);

ipcMain.handle("closeDbConnection", async (event) => {
  if (!client) return "closed";
  await client.end();
  client = null;
  return "closed";
});

ipcMain.handle("queryDb", async (event, { query, queryParams }) => {
  if (!client) {
    throw new Error("Database connection is not established.");
  }
  const res = await client.query(query, queryParams);
  return JSON.stringify(res);
});
