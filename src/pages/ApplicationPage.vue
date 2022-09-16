<template>
  <h4>Application Logs</h4>
  <LogTable :rows="rows"></LogTable>
</template>
<script lang="ts" setup>
import { getApplicationLog } from 'src/utils/logParser';
import { useLogStore } from 'stores/logStore';
import LogTable from 'src/components/LogTable.vue';
import { ref } from 'vue';

const logStore = useLogStore();
const rows = ref(getApplicationLog(logStore.getRows));
</script>
