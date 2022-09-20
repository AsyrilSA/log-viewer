<template>
  <div>
    <stacked-bar-chart :chart-data="chartData" />
  </div>
</template>

<script lang="ts" setup>
import { ChartData } from 'chart.js';
import StackedBarChart from 'src/components/Charts/StackedBarChart';
import type { LogInformation } from 'src/utils/logExtractor';
import { LogLevel } from 'src/utils/logParser';
import { computed, PropType, ref } from 'vue';

const props = defineProps({
  logInformation: {
    type: Object as PropType<LogInformation>,
    required: true,
  },
});

const logStatistics = computed(() => {
  return props.logInformation.logStatistics;
});

const map = computed(() => {
  const map = new Map();
  for (const v of logStatistics.value.values()) {
    for (const w of v.entries()) {
      if (!map.has(w[0])) map.set(w[0], []);
      map.get(w[0]).push(w[1]);
    }
  }
  return map;
});

const chartData = ref<ChartData<'bar'>>({
  labels: Array.from(logStatistics.value.keys()),
  datasets: [
    {
      label: 'Undefined',
      backgroundColor: '#a0c4ff',
      data: map.value.get(LogLevel.UNDEFINED),
    },
    {
      label: 'Trace',
      backgroundColor: '#9bf6ff',
      data: map.value.get(LogLevel.TRACE),
    },
    {
      label: 'Debug',
      backgroundColor: '#caffbf',
      data: map.value.get(LogLevel.DEBUG),
    },
    {
      label: 'Info',
      backgroundColor: '#fdffb6',
      data: map.value.get(LogLevel.INFO),
    },
    {
      label: 'Warning',
      backgroundColor: '#ffd6a5',
      data: map.value.get(LogLevel.WARNING),
    },
    {
      label: 'Error',
      backgroundColor: '#ffadad',
      data: map.value.get(LogLevel.ERROR),
    },
  ],
});
</script>

<style lang="scss"></style>
