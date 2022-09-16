<template>
  <q-table
    class="my-sticky-header-table"
    dense
    :rows="props.rows"
    :columns="columns"
    hide-bottom
    row-key="id"
    :rows-per-page-options="[0]"
    virtual-scroll
    separator="none"
  >
    <template v-slot:body="props">
      <q-tr :props="props" :class="getClass(props.row.level)">
        <q-td key="id" :props="props">
          {{ props.row.id }}
        </q-td>
        <q-td key="timestamp" :props="props">
          {{
            props.row.timestamp
              ? props.row.timestamp.toLocaleString('fr-CH')
              : ''
          }}
        </q-td>
        <q-td key="level" :props="props">
          {{ props.row.level }}
        </q-td>
        <q-td key="service" :props="props">
          {{ props.row.service }}
        </q-td>
        <q-td key="message" :props="props">
          {{ props.row.message }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { LogEntry } from 'src/utils/logParser';

const props = defineProps({
  rows: Array<LogEntry>,
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
  { name: 'message', label: 'Message', field: 'message', align: 'left' },
];

function getClass(level: string): string {
  return 'error-row';
}
</script>

<style lang="scss">
.my-sticky-header-table {
  /* height or max-height is important */
  height: calc(87vh);

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
    background-color: lightcoral;
  }
}
</style>
