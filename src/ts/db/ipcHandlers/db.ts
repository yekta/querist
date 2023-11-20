import { ipcMain } from "electron";
import { Client } from "pg";

let client: Client;

ipcMain.handle(
  "openDbConnectionIfNecessary",
  async (event, connectionString) => {
    if (!client) {
      client = new Client({
        connectionString: connectionString,
        ssl: true,
      });
      await client.connect();
    }
    return true;
  }
);

ipcMain.handle("closeDbConnection", async (event) => {
  if (client) {
    await client.end();
    client = null; // Reset the client after closing connection
  }
  return true;
});

ipcMain.handle("queryDb", async (event, { query, queryParams }) => {
  if (!client) {
    throw new Error("Database connection is not established.");
  }
  const res = await client.query(query, queryParams);
  return JSON.stringify(res);
});
