import Vue from 'vue';
import { Doughnut, Scatter, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

Vue.component('doughnut-chart', {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
});

Vue.component('scatter-chart', {
    extends: Scatter,
    mixins: [reactiveProp],
    props: {
      options: {
        type: Object,
        default: () => {},
      },
    },
    mounted() {
      this.renderChart(this.chartData, this.options);
    },
  });