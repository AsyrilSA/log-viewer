<template>
  <div class="row q-mt-md">
    <div class="col-4 q-pb-sm q-pl-sm">
      <DirectionFilter
        :model-value="props.store.getDirection"
        @update:model-value="updateDirection"
      ></DirectionFilter>
    </div>
    <div class="col-4 q-pb-sm q-px-sm"></div>
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
      <q-icon name="info" color="grey" size="24px" class="q-mt-sm q-ml-md">
        <q-tooltip class="log-table-tooltip">
          Use CTRL+Click on <b>Level</b> and <b>Service</b> cells to filter.<br />
          Use CTRL+G to go to line.</q-tooltip
        ></q-icon
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { date } from 'quasar';
import dateFormat from 'src/utils/dateUtils';
import { PropType } from 'vue';

import MessageSearch from 'src/components/Filters/MessageSearch.vue';
import TimestampFilter from 'src/components/Filters/TimestampFilter.vue';
import DirectionFilter from 'src/components/Filters/DirectionFilter.vue';
import { Direction } from 'src/utils/logParser';
import { FilterStoreType } from 'src/stores/logTableFilters';

const props = defineProps({
  store: {
    type: Object as PropType<FilterStoreType>,
    required: true,
  },
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

const updateDirection = (direction: any) => {
  props.store.setDirection(direction);
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
<style>
.log-table-tooltip {
  font-size: 12px;
}
</style>
