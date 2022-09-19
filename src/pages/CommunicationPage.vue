<template>
  <h4>Communication Logs</h4>
  <LogTable :rows="rows"></LogTable>
</template>
<script lang="ts" setup>
import { useLogStore } from 'stores/logStore';
import LogTable from 'src/components/LogTable.vue';
import { filterLogs } from 'src/utils/logParser';
import { computed } from 'vue';

const logStore = useLogStore();

const rows = computed(() =>
  // Only consider log entries from the robot service
  filterLogs(logStore.getRows, [(x) => x.service.startsWith('backend.robot')])
);
</script>
