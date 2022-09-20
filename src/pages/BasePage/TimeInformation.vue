<template>
  <div class="column q-pa-md">
    <div class="row row-size"> 
      <div class="col q-ml-xl">Time of first log:</div>
      <div class="col-xs-12 col-sm-6 log-value">
        {{ props.logInformation.firstDate?.toLocaleString('fr-CH') || '-' }}
      </div>
    </div>
    <div class="row row-size">
      <div class="col q-ml-xl">Time of last log:</div>
      <div class="col-xs-12 col-sm-6 log-value">{{ props.logInformation.lastDate?.toLocaleString('fr-CH') || '-' }}</div>
    </div>
    <div class="row row-size"> 
      <div class="col q-ml-xl">log total duration:</div>
      <div class="col-xs-12 col-sm-6 log-value">{{ totalDuration }} minutes</div>
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
