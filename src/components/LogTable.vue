<template>
  <div class="row">
    <h4>{{ title }}</h4>
    <div>
      <q-icon name="error" color="grey" size="24px" class="q-mt-md q-ml-md">
        <q-tooltip class="log-table-tooltip">
          Use CTRL+Click on <b>Level</b> and <b>Service</b> cells to filter
        </q-tooltip></q-icon
      >
    </div>
  </div>
  <div class="row">
    <div class="col-4 q-pb-sm q-pl-sm">
      <LogLevelFilter v-model="logLevelFilter"></LogLevelFilter>
    </div>
    <div class="col-4 q-pb-sm q-px-sm">
      <ServiceFilter
        v-model="serviceFilter"
        :options="serviceList"
      ></ServiceFilter>
    </div>
    <div class="col-4 q-pb-sm q-pr-sm">
      <MessageSearch v-model="messageFilter"></MessageSearch>
    </div>
  </div>
  <div class="row">
    <div class="col-4 q-pb-sm q-pl-sm">
      <TimestampFilter
        label="From"
        v-model="startDate"
        :rules="startDateRule"
      ></TimestampFilter>
    </div>
    <div class="col-4 q-pb-sm q-px-sm">
      <TimestampFilter
        label="To"
        v-model="endDate"
        :rules="endDateRule"
      ></TimestampFilter>
    </div>
    <div class="col-4 q-pb-sm q-pr-sm">
      <q-btn
        color="primary"
        icon="restart_alt"
        label="Reset all filters"
        @click="resetFilters"
      />
      <q-spacer></q-spacer>
    </div>
  </div>
  <q-table
    class="my-sticky-header-table"
    ref="table"
    dense
    :rows="filteredRows"
    :columns="columns"
    hide-pagination
    row-key="id"
    :rows-per-page-options="[0]"
    virtual-scroll
    virtual-scroll-sticky-size-start="48"
    separator="none"
    no-data-label="There is nothing to display for this type for the loaded log."
  >
    <template v-slot:body="props">
      <q-tr :props="props" :class="getClass(props.row.level)">
        <q-td key="id" :props="props">
          {{ props.row.id }}
        </q-td>
        <q-td key="timestamp" :props="props">
          {{ props.row.timestamp?.toLocaleString('fr-CH') || '' }}
        </q-td>
        <q-td
          key="level"
          :props="props"
          @click.ctrl="filterLogLevel(props.row.level)"
        >
          {{ props.row.level }}
        </q-td>
        <q-td
          key="service"
          :props="props"
          @click.ctrl="filterService(props.row.service)"
        >
          {{ props.row.service }}
        </q-td>
        <q-td key="logger" :props="props">
          {{ props.row.logger }}
        </q-td>
        <q-td key="message" :props="props">
          {{ props.row.message }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <q-page-sticky
    v-if="rows.length > 0"
    position="bottom-right"
    :offset="[20, 20]"
  >
    <q-btn
      round
      color="grey-6"
      icon="arrow_back"
      class="rotate-90"
      @click="goToTop"
    ></q-btn>
  </q-page-sticky>
</template>

<script lang="ts" setup>
import { LogEntry, LogLevel } from 'src/utils/logParser';
import { Ref, ref } from 'vue';
import { computed } from 'vue';
import LogLevelFilter from 'src/components/Filters/LogLevelFilter.vue';
import MessageSearch from 'src/components/Filters/MessageSearch.vue';
import ServiceFilter from 'src/components/Filters/ServiceFilter.vue';
import TimestampFilter from 'src/components/Filters/TimestampFilter.vue';
import { getLogInformation } from 'src/utils/logExtractor';
import dateFormat from 'src/utils/dateUtils';
import { date } from 'quasar';

const props = defineProps({
  rows: {
    type: Array<LogEntry>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const serviceList = computed(() => {
  // Return unique values of services
  return [...new Set(props.rows.map((r) => r.service))];
});

const logLevelFilter: Ref<string[]> = ref([]);
const serviceFilter: Ref<string[]> = ref([]);
const messageFilter = ref('');

const logInfo = computed(() => getLogInformation(props.rows));
const startDate = ref(logInfo.value.firstDate);
const endDate = ref(logInfo.value.lastDate);
const startDateRule = [
  (start: string) => {
    date.extractDate(start, dateFormat) <= endDate.value ||
      'From date must be before To date';
  },
];
const endDateRule = [
  (end: string) =>
    date.extractDate(end, dateFormat) >= startDate.value ||
    'To date must be after From date',
];

let filteredRows = computed(() => {
  let remainingRows = props.rows;
  if (logLevelFilter.value.length > 0) {
    remainingRows = remainingRows.filter((r) =>
      logLevelFilter.value.includes(r.level)
    );
  }
  if (serviceFilter.value.length > 0) {
    remainingRows = remainingRows.filter((r) =>
      serviceFilter.value.includes(r.service)
    );
  }
  if (messageFilter.value !== '') {
    remainingRows = remainingRows.filter((r) =>
      r.message.toLowerCase().includes(messageFilter.value.toLowerCase())
    );
  }

  remainingRows = remainingRows.filter((r) => {
    if (r.timestamp !== null && startDate.value && endDate.value) {
      return r.timestamp >= startDate.value && r.timestamp <= endDate.value;
    } else {
      return true;
    }
  });

  return remainingRows;
});

const columns = [
  {
    name: 'id',
    required: true,
    label: 'Line',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'timestamp',
    align: 'left',
    label: 'Timestamp',
    field: 'timestamp',
    sortable: true,
    format: (value: Date) => {
      if (value) return value.toLocaleString('fr-CH');
    },
  },
  {
    name: 'level',
    label: 'Level',
    field: 'level',
    align: 'left',
    sortable: true,
  },
  {
    name: 'service',
    label: 'Service',
    field: 'service',
    align: 'left',
    sortable: true,
  },
  {
    name: 'logger',
    label: 'Logger',
    field: 'logger',
    align: 'left',
    sortable: true,
  },
  { name: 'message', label: 'Message', field: 'message', align: 'left' },
];

function getClass(level: LogLevel): string {
  switch (level) {
    case LogLevel.ERROR:
      return 'error-row';
    case LogLevel.WARNING:
      return 'warning-row';
    case LogLevel.INFO:
      return 'info-row';
    case LogLevel.DEBUG:
      return 'debug-row';
    case LogLevel.TRACE:
      return 'trace-row';
    case LogLevel.SYSTEM:
      return 'system-row';
  }
}
const filterLogLevel = (logLevel: LogLevel) => {
  logLevelFilter.value = [logLevel];
};

const filterService = (service: string) => {
  serviceFilter.value = [service];
};

const resetFilters = () => {
  logLevelFilter.value = [];
  serviceFilter.value = [];
  messageFilter.value = '';
  startDate.value = logInfo.value.firstDate;
  endDate.value = logInfo.value.lastDate;
};

const table = ref(null);

const goToTop = () => {
  if (table.value) {
    table.value.scrollTo(0);
  }
};
</script>

<style lang="scss">
.my-sticky-header-table {
  /* height or max-height is important */
  max-height: calc(100vh - 200px);

  thead tr:first-child th {
    /* bg color is important for th; just specify one */
    background-color: white;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }
  thead tr:first-child th {
    top: 0;
  }

  /* this is when the loading indicator appears */
  .q-table--loading thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px;
  }

  .error-row {
    background-color: v-bind('logLevelColors(LogLevel.ERROR)');
  }
  .warning-row {
    background-color: v-bind('logLevelColors(LogLevel.WARNING)');
  }
  .info-row {
    background-color: v-bind('logLevelColors(LogLevel.INFO)');
  }
  .debug-row {
    background-color: v-bind('logLevelColors(LogLevel.DEBUG)');
  }
  .trace-row {
    background-color: v-bind('logLevelColors(LogLevel.TRACE)');
  }
  .system-row {
    background-color: v-bind('logLevelColors(LogLevel.SYSTEM)');
  }
  .q-table__bottom {
    min-height: 300px;
    display: flex;
    justify-content: center;
    font-size: 18px;
    .q-table__bottom-nodata-icon {
      color: var(--q-secondary);
    }
  }
}

.log-table-tooltip {
  font-size:16px;
}
</style>
