<template>
    <v-container fluid>
      <scatter-chart :chart-data="chartData" :options="chartOptions" />
    </v-container>
</template>

<script>
import colors from "vuetify/es5/util/colors";

export default {
  props:["data","xticks"],
  data() {
    return {
      chartDataValues: [],
      chartLabels: ['Oneline','Scroll','Oneline','Scroll'],
      dataLength: 4,
      chartOptions: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
              ticks: {
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                      return value+'ms';
                  }
              }
          }],
        },
        animation: {
          duration: 500,
          easing: "easeInOutCubic"
        }
      }
    };
  },
  computed: {
    chartData() {
      if(this.xticks !== null){
        let xAxes = []
        let ticks = {
          ticks: {
            max: this.xticks.max,
            min: this.xticks.min,
            stepSize: this.xticks.stepSize
          }
        }
        xAxes.push(ticks)
        this.chartOptions.scales.xAxes = xAxes
      }
      return {
        datasets: this.data,
        labels: this.chartLabels
      };
    }
  }
};
</script>