<template>
  <LogFilter :service-list="serviceList" :store="props.filterStore"></LogFilter>
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
      color="secondary"
      icon="arrow_back"
      class="rotate-90"
      @click="goToTop"
    ></q-btn>
  </q-page-sticky>
</template>

<script lang="ts" setup>
import { FilterStoreType } from 'src/stores/logTableFilters';
import { getDateRange } from 'src/utils/logExtractor';
import { LogEntry, LogLevel } from 'src/utils/logParser';
import { onMounted, ref } from 'vue';
import { computed } from 'vue';
import LogFilter from './Filters/LogFilter.vue';

const props = defineProps({
  rows: {
    type: Array<LogEntry>,
    required: true,
  },
  filterStore: {
    type: {} as FilterStoreType,
    required: true,
  },
});

const serviceList = computed(() => {
  // Return unique values of services
  return [...new Set(props.rows.map((r) => r.service))];
});

const logInfo = computed(() => getDateRange(props.rows));
props.filterStore.setStartDate(logInfo.value.first);
props.filterStore.setEndDate(logInfo.value.last);

onMounted(() => {
  if ('clickedPie' in history.state) {
    props.filterStore.setLevels(history.state.clickedPie);
  }
  if ('clickedBar' in history.state) {
    props.filterStore.setLevels(history.state.clickedBar.logLevel);
    props.filterStore.setServices(history.state.clickedBar.service);
  }
});

let filteredRows = computed(() => {
  let remainingRows = props.rows;
  if (props.filterStore.getLevels.length > 0) {
    remainingRows = remainingRows.filter((r) =>
      props.filterStore.getLevels.includes(r.level)
    );
  }
  if (props.filterStore.getServices.length > 0) {
    remainingRows = remainingRows.filter((r) =>
      props.filterStore.getServices.includes(r.service)
    );
  }
  if (props.filterStore.getMessage !== '') {
    remainingRows = remainingRows.filter((r) =>
      r.message
        .toLowerCase()
        .includes(props.filterStore.getMessage.toLowerCase())
    );
  }

  remainingRows = remainingRows.filter((r) => {
    if (
      r.timestamp !== null &&
      props.filterStore.getStartDate &&
      props.filterStore.getEndDate
    ) {
      return (
        r.timestamp >= props.filterStore.getStartDate &&
        r.timestamp <= props.filterStore.getEndDate
      );
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
  props.filterStore.setLevel([logLevel]);
};

const filterService = (service: string) => {
  props.filterStore.setService([service]);
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
  max-height: calc(100vh - 164px);

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
  font-size: 16px;
}
</style>
