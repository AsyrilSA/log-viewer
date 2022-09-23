<template>
  <LogTable :rows="rows" :filter-store="communicationFilterStore"></LogTable>
</template>
<script lang="ts" setup>
import { useLogStore } from 'stores/logStore';
import LogTable from 'src/components/LogTable.vue';
import { filterLogs } from 'src/utils/logParser';
import { computed } from 'vue';
import { useCommunicationFilterStore } from 'src/stores/logTableFilters';

const logStore = useLogStore();
const communicationFilterStore = useCommunicationFilterStore();

const rows = computed(() =>
  // Only consider log entries from the robot service
  filterLogs(logStore.getRows, [(x) => x.logger.startsWith('backend.robot')])
);
</script>
