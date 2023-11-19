import { ipcMain } from "electron";
import { Client } from "pg";

ipcMain.handle("getSchemas", async (event, connectionString) => {
  const client = new Client({
    connectionString,
    ssl: true,
  });
  await client.connect();
  const res = await client.query(
    "SELECT schema_name FROM information_schema.schemata"
  );
  await client.end();
  return res.rows.map((row) => row.schema_name);
});
