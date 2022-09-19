import { defineStore } from 'pinia';
import type { LogEntry } from 'src/utils/logParser';

export const useLogStore = defineStore('log', {
  state: () => ({
    rows: [] as LogEntry[],
    logFileName: '',
  }),
  getters: {
    getRows: (state) => state.rows,
    getName: (state) => state.logFileName,
  },
  actions: {
    setLogs(newRows: LogEntry[], fileName: string) {
      this.rows = newRows;
      this.logFileName = fileName;
    },
  },
});
