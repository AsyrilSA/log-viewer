<template>
  <div class="row q-mt-md">
    <div class="col-4 q-pb-sm q-pl-sm">
      <LevelFilter
        :model-value="props.store.getLevels"
        @update:model-value="updateLevels"
      ></LevelFilter>
    </div>
    <div class="col-4 q-pb-sm q-px-sm">
      <ServiceFilter
        :model-value="props.store.getServices"
        :options="serviceListOrdered"
        @update:model-value="updateServices"
      ></ServiceFilter>
    </div>
    <div class="col-4 q-pb-sm q-pr-sm">
      <MessageSearch
        :model-value="props.store.getMessage"
        @update:model-value="updateMessage"
      ></MessageSearch>
    </div>
  </div>
  <div class="row">
    <div class="col-4 q-pb-sm q-pl-sm">
      <TimestampFilter
        label="From"
        :model-value="props.store.getStartDate"
        @update:model-value="updateStartDate"
        :rules="startDateRule"
      ></TimestampFilter>
    </div>
    <div class="col-4 q-pb-sm q-px-sm">
      <TimestampFilter
        label="To"
        :model-value="props.store.getEndDate"
        @update:model-value="updateEndDate"
        :rules="endDateRule"
      ></TimestampFilter>
    </div>
    <div class="col-3 q-pb-sm q-pr-sm">
      <q-btn
        color="primary"
        icon="restart_alt"
        label="Reset all filters"
        @click="resetFilters"
      />
    </div>
    <div class="col-1 q-pb-sm q-pr-sm">
      <q-icon name="error" color="grey" size="24px" class="q-mt-sm q-ml-md">
        <q-tooltip class="log-table-tooltip">
          Use CTRL+Click on <b>Level</b> and <b>Service</b> cells to filter
        </q-tooltip></q-icon
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { date } from 'quasar';
import dateFormat from 'src/utils/dateUtils';
import { computed, PropType } from 'vue';

import LevelFilter from 'src/components/Filters/LevelFilter.vue';
import ServiceFilter from 'src/components/Filters/ServiceFilter.vue';
import MessageSearch from 'src/components/Filters/MessageSearch.vue';
import TimestampFilter from 'src/components/Filters/TimestampFilter.vue';
import { FilterStoreType } from 'src/stores/logTableFilters';

const props = defineProps({
  store: {
    type: Object as PropType<FilterStoreType>,
    required: true,
  },
  serviceList: {
    type: Array as PropType<string[]>,
    required: true,
  },
});

const serviceListOrdered = computed(() => {
  return [...props.serviceList].sort();
});
const startDateRule = [
  (start: string) => {
    if (props.store.getEndDate) {
      date.extractDate(start, dateFormat) <= props.store.getEndDate ||
        'From date must be before To date';
    } else {
      return true;
    }
  },
];
const endDateRule = [
  (end: string) => {
    if (props.store.getStartDate) {
      date.extractDate(end, dateFormat) >= props.store.getStartDate ||
        'To date must be after From date';
    } else {
      return true;
    }
  },
];

const resetFilters = () => {
  props.store.resetAllFilters();
};

const updateLevels = (levels: string[]) => {
  props.store.setLevels(levels);
};

const updateServices = (services: string[]) => {
  props.store.setServices(services);
};

const updateMessage = (message: string) => {
  props.store.setMessage(message);
};

const updateStartDate = (start: Date | null) => {
  props.store.setStartDate(start);
};

const updateEndDate = (end: Date | null) => {
  props.store.setEndDate(end);
};
</script>
