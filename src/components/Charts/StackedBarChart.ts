import { defineComponent, h, PropType } from "vue";

import { Bar } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Plugin
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: "BarChart",
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart"
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: "",
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
       default: () => ({}),
    },
    plugins: {
      type: Array as PropType<Plugin<'pie'>[]>,
       default: () => ([]),
    }
  },
  setup(props) {
    const chartData = {
      labels: [
        "Communication",
        "Application",
        "Kernel",
      ],
      datasets: [
        {
          label: "Warning",
          backgroundColor: "#FFBA01",
          data: [2542, 6532, 1249]
        },
        {
          label: "Info",
          backgroundColor: "#00D8FF",
          data: [1021, 10211, 1111]
        },
                {
          label: "error",
          backgroundColor: "#f87979",
          data: [765, 1234, 100]
        }
      ]
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true
        }
      }
    };

    return () =>
      h(Bar, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      });
  }
});
