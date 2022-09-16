import { defineStore } from 'pinia';

export const useLogStore = defineStore('log', {
  state: () => ({
    rows: [],
    logFileName:''
  }),
  getters: {
    getRows: (state) => state.rows,
    getName: (state) => state.logFileName,
  },
  actions: {
    setLogs(newRows :[], fileName:string) {
      this.rows= newRows
      this.logFileName = fileName     
    },
  },
});
