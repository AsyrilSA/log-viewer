<template>
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
    <div class="col-12">
      <TimestampFilter v-model="dateFilter"></TimestampFilter>
    </div>
  </div>
  <q-table
    class="my-sticky-header-table"
    dense
    :rows="filteredRows"
    :columns="columns"
    hide-pagination
    row-key="id"
    :rows-per-page-options="[0]"
    virtual-scroll
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
        <q-td key="level" :props="props">
          {{ props.row.level }}
        </q-td>
        <q-td key="service" :props="props">
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
</template>

<script lang="ts" setup>
import { LogEntry, LogLevel } from 'src/utils/logParser';
import { Ref, ref } from 'vue';
import { computed } from 'vue';
import LogLevelFilter from 'src/components/Filters/LogLevelFilter.vue';
import MessageSearch from 'src/components/Filters/MessageSearch.vue';
import ServiceFilter from 'src/components/Filters/ServiceFilter.vue';
import TimestampFilter from 'src/components/Filters/TimestampFilter.vue';

const props = defineProps({
  rows: {
    type: Array<LogEntry>,
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
const dateFilter = ref('');

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
    case LogLevel.UNDEFINED:
      return 'undefined-row';
  }
}
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
    background-color: $log-level-error-color;
  }
  .warning-row {
    background-color: $log-level-warning-color;
  }
  .info-row {
    background-color: $log-level-info-color;
  }
  .debug-row {
    background-color: $log-level-debug-color;
  }
  .trace-row {
    background-color: $log-level-trace-color;
  }
  .undefined-row {
    background-color: $log-level-undefined-color;
  }
  .q-table__bottom{
    min-height:300px;
    display: flex;
    justify-content:center;
  }
}
</style>
