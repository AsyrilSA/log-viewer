import { defineComponent, h, PropType } from 'vue';

import { Pie } from 'vue-chartjs';
import { HistoryState, useRouter } from 'vue-router';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin,
  ChartData,
  DefaultDataPoint,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default defineComponent({
  name: 'PieChart',
  components: {
    Pie,
  },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart',
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
      type: Object as PropType<ChartData<'pie', DefaultDataPoint<'pie'>>>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        },
      },
      'onClick': function (evt, item) {
        const clickedElem = item.shift()
        const index = clickedElem.index
        if (props.chartData.labels != undefined) {
          const clickedPie = [props.chartData.labels[index]]
          router.push({ name: 'raw', state: { clickedPie } as HistoryState})
        }
      }
    };

    return () =>
      h(Pie, {
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
