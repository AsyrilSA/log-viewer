<template>
  <LogTable :rows="rows" :filter-store="applicationFilterStore"></LogTable>
</template>

<script lang="ts" setup>
import { useLogStore } from 'src/stores/logStore';
import LogTable from 'src/components/LogTable.vue';
import { filterLogs } from 'src/utils/logParser';
import { computed } from 'vue';
import { useApplicationFilterStore } from 'src/stores/logTableFilters';

const logStore = useLogStore();
const applicationFilterStore = useApplicationFilterStore();

const rows = computed(() =>
  // Consider all log entries except the system ones
  filterLogs(
    logStore.getRows,
    [(x) => true], // eslint-disable-line @typescript-eslint/no-unused-vars
    [(x) => x.service === 'system']
  )
);
</script>
