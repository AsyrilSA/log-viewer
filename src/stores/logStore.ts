import { defineStore } from 'pinia';
import { LogInformation, RecipeInformation } from 'src/utils/logExtractor';
import type { LogEntry } from 'src/utils/logParser';

export const useLogStore = defineStore('log', {
  state: () => ({
    rows: [] as LogEntry[],
    logInformation: {} as LogInformation,
    logFileName: '',
    metadata: {},
    recipeInformation: {} as RecipeInformation,
    isLogLoading:false,
  }),
  getters: {
    getRows: (state) => state.rows,
    getLogInformation: (state) => state.logInformation,
    getName: (state) => state.logFileName,
    getMetadata: (state) => state.metadata,
    getRecipeInformation: (state) => state.recipeInformation,
    getLogLoading: (state) => state.isLogLoading,
  },
  actions: {
    setLogs(newRows: LogEntry[], fileName: string) {
      this.rows = newRows;
      this.logFileName = fileName;
      this.setLogLoading(false)
    },
    setLogInformation(logInformation: LogInformation) {
      this.logInformation = logInformation;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setMetaData(metadata: any) {
      this.metadata = metadata;
    },
    setRecipeInformation(recipeInformation: RecipeInformation) {
      this.recipeInformation = recipeInformation;
    },
   setLogLoading(isLogLoading: boolean) {
      this.isLogLoading = isLogLoading;
    },
  },
});
