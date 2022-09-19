<template>
  <h4>Application Logs</h4>
  <LogTable :rows="logStore.getApplicationLog"></LogTable>
</template>

<script lang="ts" setup>
import { useLogStore } from 'stores/logStore';
import LogTable from 'src/components/LogTable.vue';

const logStore = useLogStore();
</script>
