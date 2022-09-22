import { defineStore } from 'pinia';
import type { LogEntry } from 'src/utils/logParser';

export const useLogStore = defineStore('log', {
  state: () => ({
    rows: [] as LogEntry[],
    logFileName: '',
    metadata: {},
    isLogLoading:false,
  }),
  getters: {
    getRows: (state) => state.rows,
    getName: (state) => state.logFileName,
    getMetadata: (state) => state.metadata,
    getLogLoading: (state) => state.isLogLoading,
  },
  actions: {
    setLogs(newRows: LogEntry[], fileName: string) {
      this.rows = newRows;
      this.logFileName = fileName;
      this.setLogLoading(false)
    },
    setMetaData(metadata: any) {
      this.metadata = metadata;
    },
    setLogLoading(isLogLoading: boolean) {
      this.isLogLoading = isLogLoading;
    },
  },
});
