<template>
  <div class="column q-pa-md expand-row justify-around">
    <div class="row">
      <div class="col q-ml-xl">Time of first log:</div>
      <div class="col">
        {{ props.logInformation.firstDate?.toLocaleString('fr-CH') || '-' }}
      </div>
    </div>
    <div class="row">
      <div class="col q-ml-xl">Time of last log:</div>
      <div class="col">
        {{ props.logInformation.lastDate?.toLocaleString('fr-CH') || '-' }}
      </div>
    </div>
    <div class="row">
      <div class="col q-ml-xl">Log total duration:</div>
      <div class="col">{{ totalDuration }} minutes</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { date } from 'quasar';
import type { LogInformation } from 'src/utils/logExtractor';
import { computed, PropType } from 'vue';

const props = defineProps({
  logInformation: {
    type: Object as PropType<LogInformation>,
    required: true,
  },
});

const totalDuration = computed(() =>
  date.getDateDiff(
    props.logInformation.lastDate || 0,
    props.logInformation.firstDate || 0,
    'minutes'
  )
);
</script>

<style lang="scss"></style>
