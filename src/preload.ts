import { contextBridge, ipcRenderer } from "electron";

export const electronAPI = {
  platform: process.platform,
  queryDb: async (props: { query: string; queryParams?: string[] }) => {
    try {
      return await ipcRenderer.invoke("queryDb", props);
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  openDbConnectionIfNecessary: async (connectionString: string) => {
    try {
      return await ipcRenderer.invoke("openDbConnection", connectionString);
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  closeDbConnection: async () => {
    try {
      return await ipcRenderer.invoke("closeDbConnection");
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);
