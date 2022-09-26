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
    :offset="[20, 70]"
  >
    <q-btn
      round
      color="secondary"
      icon="arrow_back"
      class="rotate-90"
      @click="goToTop"
    ></q-btn>
  </q-page-sticky>
  <q-page-sticky
    v-if="rows.length > 0"
    position="bottom-right"
    :offset="[20, 20]"
  >
    <q-btn
      color="secondary"
      icon="skip_next error"
      class="button-prev-next"
      @click="goToNextError"
    >
      <q-tooltip anchor="top left" class="button-tooltip">
        Go to next error
      </q-tooltip>
    </q-btn>
  </q-page-sticky>
  <q-page-sticky
    v-if="rows.length > 0"
    position="bottom-right"
    :offset="[100, 20]"
  >
    <q-btn
      color="secondary"
      icon="error skip_previous"
      class="button-prev-next"
      @click="goToPreviousError"
    >
      <q-tooltip anchor="top left" class="button-tooltip">
        Go to previous error
      </q-tooltip>
    </q-btn>
  </q-page-sticky>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { FilterStoreType } from 'src/stores/logTableFilters';
import { getDateRange } from 'src/utils/logExtractor';
import { LogEntry, LogLevel } from 'src/utils/logParser';
import { onMounted, onUnmounted, PropType, ref, watch } from 'vue';
import { computed } from 'vue';
import LogFilter from './Filters/LogFilter.vue';

const props = defineProps({
  rows: {
    type: Array<LogEntry>,
    required: true,
  },
  filterStore: {
    type: Object as PropType<FilterStoreType>,
    required: true,
  },
});

const serviceList = computed(() => {
  // Return unique values of services
  return [...new Set(props.rows.map((r) => r.service))];
});

onMounted(() => {
  if ('clickedPie' in history.state) {
    props.filterStore.setLevels(history.state.clickedPie);
  }
  if ('clickedBar' in history.state) {
    props.filterStore.setLevels(history.state.clickedBar.logLevel);
    props.filterStore.setServices(history.state.clickedBar.service);
  }
  refreshFilter(props.rows);

  window.addEventListener('keydown', onKeyEvent);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyEvent);
});

watch(
  () => props.rows,
  (rows) => {
    refreshFilter(rows);
  }
);

const refreshFilter = (rows: LogEntry[]) => {
  currentErrorIndex = 0;
  const logInfo = getDateRange(rows);
  props.filterStore.setStartDate(logInfo.first);
  props.filterStore.setEndDate(logInfo.last);
};

const $q = useQuasar();

let goToLineOpened = false;

const onKeyEvent = (e: KeyboardEvent) => {
  if (e.key === 'g' && (e.ctrlKey || e.metaKey)) {
    // Our application uses Ctrl+G, not the browser!
    e.preventDefault();

    if (goToLineOpened) return;

    goToLineOpened = true;
    $q.dialog({
      title: 'Go to line',
      prompt: {
        model: '',
        type: 'number',
      },
      cancel: true,
      persistent: true,
    })
      .onOk((data: number) => {
        if (data) {
          goToLine(+data);
        }
        goToLineOpened = false;
      })
      .onCancel(() => {
        goToLineOpened = false;
      })
      .onDismiss(() => {
        goToLineOpened = false;
      });
  }
};

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
  props.filterStore.setLevels([logLevel]);
};

const filterService = (service: string) => {
  props.filterStore.setServices([service]);
};

const table = ref(null);
let currentErrorIndex = 0;

const goToTop = () => {
  if (table.value) {
    table.value.scrollTo(0);
    currentErrorIndex = 0;
  }
};

const goToNextError = () => {
  const errorRowIndex = filteredRows.value.findIndex(
    (row, rowIndex) =>
      row.level === LogLevel.ERROR && rowIndex > currentErrorIndex
  );
  if (errorRowIndex >= 0 && table.value) {
    table.value.scrollTo(errorRowIndex, 'start-force');
    currentErrorIndex = errorRowIndex;
  }
};

const goToPreviousError = () => {
  let errorRowIndex = [...filteredRows.value]
    .reverse()
    .findIndex(
      (row, rowIndex) =>
        row.level === LogLevel.ERROR &&
        rowIndex > filteredRows.value.length - currentErrorIndex
    );

  errorRowIndex =
    errorRowIndex >= 0 ? filteredRows.value.length - 1 - errorRowIndex : -1;

  if (errorRowIndex >= 0 && table.value) {
    if (errorRowIndex && table.value) {
      table.value.scrollTo(errorRowIndex, 'start-force');
      currentErrorIndex = errorRowIndex;
    }
  }
};

const goToLine = (line: number) => {
  const index = filteredRows.value.findIndex((row) => row.id === line);
  table.value?.scrollTo(index, 'start-force');
  if (index < 0) {
    $q.notify({
      message: 'Line ' + line + ' does not exist.',
      type: 'warning',
    });
  }
};
</script>

<style lang="scss">
.my-sticky-header-table {
  /* height or max-height is important */
  max-height: calc(100vh - 164px);

  thead th {
    /* bg color is important for th; just specify one */
    background-color: white;
  }

  thead tr th {
    top: 0;
    position: sticky;
    z-index: 1;
  }
  tbody tr td:nth-child(1) {
    width: 80px !important;
    min-width: 80px !important;
    min-width: 80px !important;
  }
  tbody tr td:nth-child(2) {
    width: 150px !important;
    min-width: 150px !important;
    max-width: 150px !important;
  }
  tbody tr td:nth-child(3) {
    width: 80px !important;
    min-width: 80px !important;
    max-width: 80px !important;
  }
  tbody tr td:nth-child(4) {
    width: 80px !important;
    min-width: 80px !important;
    max-width: 80px !important;
  }
  tbody tr td:nth-child(5) {
    width: 140px !important;
    min-width: 140px !important;
    max-width: 140px !important;
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

.button-tooltip {
  font-size: 13px;
}

.button-prev-next {
  width: 5em;
}
</style>
