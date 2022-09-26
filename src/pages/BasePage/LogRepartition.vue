<template>
  <div>
    <pie-chart :chart-data="chartData" :is-ctrl-pressed="isCtrlPressed"/>
  </div>
</template>

<script lang="ts" setup>
import PieChart from 'src/components/Charts/PieChart';

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
  isCtrlPressed: Boolean
});

function getStatistics(
  statistics: Map<string, Map<LogLevel, number>>,
  levels: LogLevel[]
): number[] {
  const data = [];
  for (const level of levels) {
    let value = 0;
    for (const map of statistics.values()) {
      value += map.get(level) || 0;
    }
    data.push(value);
  }
  return data;
}

const chartData = computed(() => {
  const statistics = props.logInformation.statistics;
  const levels = Object.values(LogLevel);

  return {
    labels: levels,
    datasets: [
      {
        backgroundColor: Object.values(LogLevel).map((value) =>
          logColors(value)
        ),
        data: getStatistics(statistics, levels),
      },
    ],
  };
});
</script>

<style lang="scss"></style>
