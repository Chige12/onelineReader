<template>
    <v-container fluid>
      <scatter-chart :chart-data="chartData" :options="chartOptions" />
    </v-container>
</template>

<script>
import colors from "vuetify/es5/util/colors";

export default {
  props:["data"],
  data() {
    return {
      chartDataValues: [],
      chartLabels: ['Oneline'],
      dataLength: 4,
      chartOptions: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
              ticks: {
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                      return value;
                  }
              }
          }],
          xAxes: [{
              ticks: {
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                      return value+'ms';
                  }
              }
          }],
        },
        animation: {
          duration: 0,
          easing: "easeInOutCubic"
        }
      }
    };
  },
  computed: {
    chartData() {
      return {
        datasets: this.data,
        labels: this.chartLabels
      };
    }
  }
};
</script>