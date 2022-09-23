<template>
  <div class="column q-pa-md">
    <div class="row row-size">
      <div class="col">Time of first log:</div>
      <div class="col-xs-12 col-sm-6 log-value">
        {{
          props.logInformation.dateRange.first.toLocaleString('fr-CH') || '-'
        }}
      </div>
    </div>
    <div class="row row-size">
      <div class="col">Time of last log:</div>
      <div class="col-xs-12 col-sm-6 log-value">
        {{ props.logInformation.dateRange.last.toLocaleString('fr-CH') || '-' }}
      </div>
    </div>
    <div class="row row-size">
      <div class="col">Log total duration:</div>
      <div class="col-xs-12 col-sm-6 log-value">{{ computedDuration }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { date } from 'quasar';
import type { LogInformation } from 'src/utils/logExtractor';
import { computed, PropType } from 'vue';
import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const props = defineProps({
  logInformation: {
    type: Object as PropType<LogInformation>,
    required: true,
  },
});

const totalDuration = computed(() =>
  date.getDateDiff(
    props.logInformation.dateRange.last || 0,
    props.logInformation.dateRange.first || 0,
    'minutes'
  )
);

interface duration {
  day: number;
  hour: number;
  minute: number;
  second: number;
}
const structure = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};
type StructureKey = keyof typeof structure;

const computedDuration = computed(() => {
  let durationObject = {} as duration;
  let seconds = totalDuration.value * 60;

  for (const key in structure) {
    let currentResult = Math.floor(seconds / structure[key as StructureKey]);
    durationObject[key as StructureKey] = currentResult;
    seconds -= currentResult * structure[key as StructureKey];
  }
  let formatedDuration = dayjs
    .duration({
      seconds: durationObject.second,
      minutes: durationObject.minute,
      hours: durationObject.hour,
      days: durationObject.day,
    })
    .format('DD[ days] HH [hours] mm [minutes]');

  return formatedDuration;
});
</script>

<style lang="scss"></style>
