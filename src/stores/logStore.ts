import { defineStore } from 'pinia';
import { LogInformation } from 'src/utils/logExtractor';
import type { LogEntry } from 'src/utils/logParser';

export const useLogStore = defineStore('log', {
  state: () => ({
    rows: [] as LogEntry[],
    logInformation: {} as LogInformation,
    logFileName: '',
    metadata: {},
  }),
  getters: {
    getRows: (state) => state.rows,
    getLogInformation: (state) => state.logInformation,
    getName: (state) => state.logFileName,
    getMetadata: (state) => state.metadata,
  },
  actions: {
    setLogs(newRows: LogEntry[], fileName: string) {
      this.rows = newRows;
      this.logFileName = fileName;
    },
    setLogInformation(logInformation: LogInformation) {
      this.logInformation = logInformation;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setMetaData(metadata: any) {
      this.metadata = metadata;
    },
  },
});
