<template>
  <h4>Raw Logs</h4>
  <LogTable :rows="logStore.getRawLog"></LogTable>
</template>

<script lang="ts" setup>
import { useLogStore } from 'stores/logStore';
import LogTable from 'src/components/LogTable.vue';

const logStore = useLogStore();
</script>
