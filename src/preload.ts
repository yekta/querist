import { contextBridge, ipcRenderer } from "electron";

export const electronAPI = {
  platform: process.platform,
  queryDb: async (props: {
    connectionString: string;
    query: string;
    queryParams?: string[];
  }) => {
    try {
      return await ipcRenderer.invoke("queryDb", props);
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);
