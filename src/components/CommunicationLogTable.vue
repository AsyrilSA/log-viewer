<template>
  <CommunicationFilter :store="filterStore"></CommunicationFilter>
  <q-table
    class="communication-table"
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
      <q-tr :props="props">
        <q-td key="id" :props="props">
          {{ props.row.id }}
        </q-td>
        <q-td key="timestamp" :props="props">
          {{ formatTimestamp(props.row.timestamp) || '' }}
        </q-td>
        <q-td key="direction" :props="props">
          <div v-if="props.row.direction" class="direction-image-cell">
            <q-icon name="computer" size="sm" class="direction-grey-icon" />
            <q-icon
              :name="getDirectionArrow(props.row.direction)"
              size="sm"
              class="direction-arrow"
            />
            <img
              src="~assets/eyeplus_logo.svg"
              class="img-eyeplus-logo direction-grey-icon"
            />
          </div>
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
import { formatTimestamp } from 'src/utils/timeUtils';
import { useQuasar } from 'quasar';
import { FilterStoreType } from 'src/stores/logTableFilters';
import { getDateRange } from 'src/utils/logExtractor';
import { LogEntry, Direction } from 'src/utils/logParser';
import { onMounted, onUnmounted, PropType, ref, watch } from 'vue';
import { computed } from 'vue';
import CommunicationFilter from 'src/components/Filters/CommunicationFilter.vue';
import { dateLocale } from 'src/utils/dateUtils';
import { useLogStore } from 'src/stores/logStore';

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

const logStore = useLogStore();
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
  logStore.setLogLoading(false);
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
  if (props.filterStore.getDirection !== null) {
    remainingRows = remainingRows.filter((r) => {
      return r.direction === props.filterStore.getDirection;
    });
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
      if (value) return formatTimestamp(value);
    },
  },
  {
    name: 'direction',
    label: 'Event',
    field: 'direction',
    align: 'center',
  },
  { name: 'message', label: 'Message', field: 'message', align: 'left' },
];

const table = ref(null);

const goToTop = () => {
  if (table.value) {
    table.value.scrollTo(0);
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

const getDirectionArrow = (direction: Direction) => {
  switch (direction) {
    case Direction.COMPUTER_TO_EYEPLUS: {
      return 'east';
    }
    case Direction.EYEPLUS_TO_COMPUTER: {
      return 'west';
    }
    case Direction.CONNECTION_CLOSED: {
      return 'close';
    }
    case Direction.NEW_CONNECTION: {
      return 'settings_ethernet';
    }
    default: {
      return 'report';
    }
  }
};
</script>

<style lang="scss">
.communication-table {
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
    width: 150px !important;
    min-width: 150px !important;
    max-width: 150px !important;
  }
  /* this is when the loading indicator appears */
  .q-table--loading thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px;
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
  .img-eyeplus-logo {
    height: 22px;
    vertical-align: middle;
  }
  .direction-arrow {
    margin-right: 6px;
    margin-left: 6px;
  }
  .direction-grey-icon {
    filter: invert(42%) brightness(119%);
  }
}
</style>
