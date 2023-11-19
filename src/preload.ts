import { contextBridge, ipcRenderer } from "electron";

export const electronAPI = {
  platform: process.platform,
  getSchemas: async (connectionString: string) => {
    try {
      return await ipcRenderer.invoke("getSchemas", connectionString);
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);
