<template>
  <div class="column q-pa-md">
    <div class="row row-size">
      <div class="col">Log name:</div>
      <div class="col-xs-12 col-sm-6 log-value">{{ logStore.getName }}</div>
    </div>
    <div class="row row-size">
      <div class="col">Application version:</div>
      <div class="col-xs-12 col-sm-6 log-value">
        {{ props.logInformation.softwareVersion }}
      </div>
    </div>
    <div class="row row-size">
      <div class="col">Hardware version:</div>
      <div class="col-xs-12 col-sm-6 log-value">
        {{ props.logInformation.hardwareVersion }}
      </div>
    </div>
    <div class="row row-size">
      <div class="col">SOM serial number:</div>
      <div class="col-xs-12 col-sm-6 log-value">
        {{ props.logInformation.somSerialNumber }}
      </div>
    </div>
    <div class="row row-size">
      <div class="col">Number of log entries:</div>
      <div class="col-xs-12 col-sm-6 log-value">
        {{ logStore.getRows.length }}
      </div>
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
.row-size {
  height: 42px;
}
@media screen and (max-width: 600px) {
  .log-value {
    padding-left: 70px;
    color: grey;
  }
}
</style>
