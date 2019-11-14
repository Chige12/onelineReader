<template>
  <v-container fluid>
    <doughnut-chart :chart-data="chartData" :options="chartOptions"/>

    <div class="text-xs-center mt-2">
      <v-btn dark color="indigo" @click="randomizeData()">Randomize data</v-btn>
    </div>
  </v-container>
</template>

<script>
import colors from 'vuetify/es5/util/colors';

export default {
  data() {
    return {
      chartDataValues: [],
      chartColors: [
        colors.red.lighten1,
        colors.blue.lighten1,
        colors.yellow.lighten1,
        colors.green.lighten1,
      ],
      chartLabels: ['red', 'blue', 'yellow', 'green'],
      chartOptions: {
        maintainAspectRatio: false,
        animation: {
          duration: 500,
          easing: 'easeInOutCubic',
        },
      },
    };
  },
  computed: {
    chartData() {
      return {
        datasets: [
          {
            data: this.chartDataValues,
            backgroundColor: this.chartColors,
          },
        ],
        labels: this.chartLabels,
      };
    },
  },
  mounted: function() {
    this.randomizeData();
  },
  methods: {
    randomizeData: function() {
      var data = [];
      for (var i = 0; i < this.chartLabels.length; i++) {
        data.push(Math.floor(Math.random() * 100));
      }
      this.chartDataValues = data;
    },
  },
};
</script>