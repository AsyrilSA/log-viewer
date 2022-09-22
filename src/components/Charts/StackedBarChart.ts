import { defineComponent, h, PropType } from 'vue';

import { Bar } from 'vue-chartjs';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartData,
  Plugin,
  DefaultDataPoint,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => ({}),
    },
    plugins: {
      type: Array as PropType<Plugin<'pie'>[]>,
      default: () => [],
    },
    chartData: {
      type: Object as PropType<
        ChartData<'bar', DefaultDataPoint<'bar'>, unknown>
      >,
      required: true,
    },
  },

  setup(props) {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };

    return () =>
      h(Bar, {
        chartData: props.chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      });
  },
});
