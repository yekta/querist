import { contextBridge } from "electron";

export const electronAPI = {
  platform: process.platform,
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);
