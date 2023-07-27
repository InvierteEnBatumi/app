<template>
  <div>
    <apexchart width="100%" type="line" :options="chartOptions" :series="chartSeries"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import Vue from 'vue';
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);

export default {
  props: {
    xAxis: {
      type: Array,
      default: () => []
    },
    yAxis: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    chartOptions() {
      const sortedXAxis = this.xAxis.slice().sort((a, b) => a - b);

      return {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: sortedXAxis
        }
      };
    },
    chartSeries() {
      return [
        {
          name: 'Revalorizacion',
          data: this.yAxis
        }
      ];
    }
  }
};
</script>

<style scoped>
.apexcharts-toolbar {
  display: none!important;
}
</style>
