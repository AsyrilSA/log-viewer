<template>
  <LogTable title="Raw Logs" :rows="rows"></LogTable>
</template>

<script lang="ts" setup>
import { useLogStore } from 'stores/logStore';
import LogTable from 'src/components/LogTable.vue';
import { filterLogs } from 'src/utils/logParser';
import { computed } from 'vue';

const logStore = useLogStore();

const rows = computed(() =>
  // Consider everything
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filterLogs(logStore.getRows, [(x) => true])
);
</script>
