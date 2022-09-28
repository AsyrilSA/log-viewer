<template>
  <LogTable :rows="rows" :filter-store="rawFilterStore"></LogTable>
</template>

<script lang="ts" setup>
import { useLogStore } from 'src/stores/logStore';
import LogTable from 'src/components/LogTable.vue';
import { filterLogs } from 'src/utils/logParser';
import { computed } from 'vue';
import { useRawFilterStore } from 'src/stores/logTableFilters';

const logStore = useLogStore();
const rawFilterStore = useRawFilterStore();

const rows = computed(() =>
  // Consider everything
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filterLogs(logStore.getRows, [(x) => true])
);
</script>
