<template>
  <div>
    <stacked-bar-chart :chart-data="chartData" />
  </div>
</template>

<script lang="ts" setup>
import StackedBarChart from 'src/components/Charts/StackedBarChart';
import { LogInformation } from 'src/utils/logExtractor';
import { LogLevel } from 'src/utils/logParser';
import { computed, PropType } from 'vue';
import colorsMixin from 'src/mixins/colorsMixin';

const logColors = colorsMixin.data().logLevelColors;

const props = defineProps({
  logInformation: {
    type: Object as PropType<LogInformation>,
    required: true,
  },
});

const chartData = computed(() => {
  const map = new Map();
  for (const v of props.logInformation.logStatistics.values()) {
    for (const w of v.entries()) {
      if (!map.has(w[0])) map.set(w[0], []);
      map.get(w[0]).push(w[1]);
    }
  }

  return {
  labels: Array.from(props.logInformation.logStatistics.keys()),
  datasets: [
    {
      label: 'Undefined',
      backgroundColor: logColors.undefined,
      data: map.get(LogLevel.UNDEFINED),
    },
    {
      label: 'Trace',
      backgroundColor: logColors.trace,
      data: map.get(LogLevel.TRACE),
    },
    {
      label: 'Debug',
      backgroundColor: logColors.debug,
      data: map.get(LogLevel.DEBUG),
    },
    {
      label: 'Info',
      backgroundColor: logColors.info,
      data: map.get(LogLevel.INFO),
    },
    {
      label: 'Warning',
      backgroundColor: logColors.warning,
      data: map.get(LogLevel.WARNING),
    },
    {
      label: 'Error',
      backgroundColor: logColors.error,
      data: map.get(LogLevel.ERROR),
    },
  ]}

});

</script>

<style lang="scss"></style>
