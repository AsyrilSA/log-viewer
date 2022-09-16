import { defineStore } from 'pinia';
import type { LogEntry } from 'src/utils/logParser';
import {filterLogs} from 'src/utils/logParser';

export const useLogStore = defineStore('log', {
  state: () => ({
    rows:[] as LogEntry[],
    logFileName :''
  }),
  getters: {
    getRows: (state) => state.rows,
    getName: (state) => state.logFileName,
    getCommunicationLog : (state) => {
      // Only consider log entries from the robot service
      return filterLogs(state.rows, [(x) => x.service.startsWith('backend.robot')]);
    },    
    getApplicationLog : (state) => {
      // Consider all log entries except the system ones
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return filterLogs(state.rows, [(x) => true], [(x) => x.service === 'system']);
    }
  },
  actions: {
    setLogs(newRows:LogEntry[], fileName:string) {
      this.rows= newRows
      this.logFileName = fileName     
    },
  },
});
