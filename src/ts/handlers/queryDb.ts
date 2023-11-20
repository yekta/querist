import { ipcMain } from "electron";
import { Client } from "pg";

ipcMain.handle(
  "queryDb",
  async (event, { connectionString, query, queryParams }) => {
    const client = new Client({
      connectionString: connectionString,
      ssl: true,
    });
    await client.connect();
    const res = await client.query(query, queryParams);
    await client.end();
    return JSON.stringify(res);
  }
);
