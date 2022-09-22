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

function getStatistics(
  statistics: Map<string, Map<LogLevel, number>>,
  services: string[],
  level: LogLevel
): number[] {
  const data = [];
  for (const service of services) {
    data.push(statistics.get(service)?.get(level) || 0);
  }
  return data;
}

const chartData = computed(() => {
  const statistics = props.logInformation.logStatistics;
  const services = Array.from(statistics.keys());

  return {
    labels: services,
    datasets: [
      {
        label: 'Undefined',
        backgroundColor: logColors.undefined,
        data: getStatistics(statistics, services, LogLevel.UNDEFINED),
      },
      {
        label: 'Trace',
        backgroundColor: logColors.trace,
        data: getStatistics(statistics, services, LogLevel.TRACE),
      },
      {
        label: 'Debug',
        backgroundColor: logColors.debug,
        data: getStatistics(statistics, services, LogLevel.DEBUG),
      },
      {
        label: 'Info',
        backgroundColor: logColors.info,
        data: getStatistics(statistics, services, LogLevel.INFO),
      },
      {
        label: 'Warning',
        backgroundColor: logColors.warning,
        data: getStatistics(statistics, services, LogLevel.WARNING),
      },
      {
        label: 'Error',
        backgroundColor: logColors.error,
        data: getStatistics(statistics, services, LogLevel.ERROR),
      },
    ],
  };
});
</script>

<style lang="scss"></style>
