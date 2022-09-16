<template>
  <h4>Communication Logs</h4>
  <LogTable :rows="logStore.getCommunicationLog"></LogTable>
</template>
<script lang="ts" setup>
import { useLogStore } from 'stores/logStore';
import LogTable from 'src/components/LogTable.vue';

const logStore = useLogStore();
</script>
