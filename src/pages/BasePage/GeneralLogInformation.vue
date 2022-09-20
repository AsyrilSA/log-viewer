<template>
  <div class="column q-pa-md expand-row justify-around">
    <div class="row">
      <div class="col q-ml-xl">Log name:</div>
      <div class="col">{{ logStore.getName }}</div>
    </div>
    <div class="row">
      <div class="col q-ml-xl">Application version:</div>
      <div class="col">{{ props.logInformation.softwareVersion }}</div>
    </div>
    <div class="row">
      <div class="col q-ml-xl">Hardware version:</div>
      <div class="col">{{ props.logInformation.hardwareVersion }}</div>
    </div>
    <div class="row">
      <div class="col q-ml-xl">SOM serial number:</div>
      <div class="col">{{ props.logInformation.somSerialNumber }}</div>
    </div>
    <div class="row">
      <div class="col q-ml-xl">Number of log inputs:</div>
      <div class="col">{{ logStore.getRows.length }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLogStore } from 'stores/logStore';
import type { LogInformation } from 'src/utils/logExtractor';
import { PropType } from 'vue';

const props = defineProps({
  logInformation: {
    type: Object as PropType<LogInformation>,
    required: true,
  },
});

const logStore = useLogStore();
</script>

<style lang="scss">
.expand-row {
  min-height: 280px !important;
}
</style>
