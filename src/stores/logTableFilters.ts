import { defineStore } from 'pinia';
import { date } from 'quasar';

import { Direction } from 'src/utils/logParser';
import { dateFormat } from 'src/utils/dateUtils';

function createFilterStore<Id extends string>(id: Id) {
  return defineStore(id, {
    state: () => ({
      logLevels: [] as string[],
      services: [] as string[],
      message: '',
      startDate: null as Date | null,
      endDate: null as Date | null,
      direction: null as Direction | null,
    }),
    getters: {
      getLevels: (state) => state.logLevels,
      getServices: (state) => state.services,
      getMessage: (state) => state.message,
      getStartDate: (state) => {
        if (state.startDate instanceof String) {
          return date.extractDate(state.startDate, dateFormat);
        }
        return state.startDate;
      },
      getEndDate: (state) => state.endDate,
      getDirection: (state) => state.direction,
    },
    actions: {
      setLevels(levels: string[]) {
        this.logLevels = levels;
      },

      setServices(services: string[]) {
        this.services = services;
      },

      setMessage(message: string) {
        this.message = message;
      },

      setStartDate(start: Date | null) {
        if (start instanceof Date) {
          this.startDate = start;
        }
      },

      setEndDate(end: Date | null) {
        this.endDate = end;
      },

      setDirection(direction: Direction) {
        this.direction = direction;
      },

      resetAllFilters() {
        this.logLevels = [];
        this.services = [];
        this.message = '';
        this.startDate = null;
        this.endDate = null;
        this.direction = null;
      },
    },
    persist: { enabled: true },
  });
}

export const useApplicationFilterStore = createFilterStore('applicationFilter');
export const useCommunicationFilterStore = createFilterStore(
  'communicationFilter'
);
export const useRawFilterStore = createFilterStore('rawFilter');

export type FilterStoreType = ReturnType<typeof createFilterStore>;
