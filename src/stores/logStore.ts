import { defineStore } from 'pinia';
import type { LogEntry } from 'src/utils/logParser';

export const useLogStore = defineStore('log', {
  state: () => ({
    rows: [] as LogEntry[],
    logFileName: '',
    metadata: {},
  }),
  getters: {
    getRows: (state) => state.rows,
    getName: (state) => state.logFileName,
    getMetadata: (state) => state.metadata,
  },
  actions: {
    setLogs(newRows: LogEntry[], fileName: string) {
      this.rows = newRows;
      this.logFileName = fileName;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setMetaData(metadata: any) {
      this.metadata = metadata;
    },
  }
});
