<template>
  <div id="iChart" ref="iChart"
    style="height: 100%; position: relative;" class="elevation-3">
  </div>
</template>
<script>
import { setTimeout } from 'timers'
export default {
  name: "iGuanaChart",
  props: {
    item: Object,
    loadingChart: Boolean,
  },
  data(){
    return {
      chartDataSource: {
        data: {
          "hloc":{
            "LKOH":[[2296.1,2183.6,2286,2211.3],[2317,2200.9,2201,2280.9],[2376,2281.5,2289.9,2351],
                    [2595.1,2361,2371.1,2560.8],[2579,2452.5,2565,2478.8],[2519,2441.4,2460,2476.9],
                    [2553,2461.9,2479.9,2508],[2576.6,2502.2,2519.9,2566],[2653,2573,2598,2615],
                    [2748.5,2590,2612,2735],[2828.1,2631.6,2735,2656],[2675.5,2596.2,2652,2623.7],
                    [2765,2615.7,2639,2758.9],[2937.9,2744.6,2760,2821.6],[2938,2835.5,2848.2,2852]]
          },
          "vl":{
            "LKOH":[845086,561996,802012,1089062,1196954,903616,1307655,734571,
                    1280221,1076973,1687160,1049670,1110288,2043027,1613934]
          },
          "xSeries":{
            "LKOH":[1419886800,1420405200,1420491600,1420664400,1420750800,1421010000,1421096400,1421182800,
                    1421269200,1421355600,1421614800,1421701200,1421787600,1421874000,1421960400]
          }
        },
        dataSettings: {
          useHash: false,
          date_from: "29.12.2014",
          date_to: "23.01.2015",
          start: "29.12.2014",
          end: "25.02.2015",
          graphicIndicators: "",
          hash: "",
          id: "LKOH",
          interval: "D1",
          timeframe: 1440
        }
      }
    }
  },
  watch: {
    item(){
      this.$emit('update:loadingChart', true)
      this.loadData().then((dataSource)=>{
        $("#iChart").children().remove()
        delete($("#iChart").data()['iguanaChart'])
        $("#iChart").iguanaChart({
          ticker:"MICEXINDEXCF",
          chartOptions: {
            minHeight: $("#iChart").height(),
            futureAmount: 100,
            floatingLegend: true,
            floatingLegendFontSize: 14,
            floatingLegendTextColor:  "#444444",
            floatingLegendBorderColor:  "rgba(82,175,201,1)",
            floatingLegendBackground:  "rgba(82,175,201,.6)",
          },
          dataSource: dataSource
        })
        this.$emit('update:loadingChart', false)
      })
    }
  },
  methods: {
    async loadData(){
      if(this.item)
        this.chartDataSource.data["hloc"]["LKOH"].forEach(c=>{
          let offset = Math.round(Math.random()*150-100)
          c.forEach((v,i)=>{
            c[i] = v + offset
            if(c[i]<0) c[i] = v - offset
          })
        })
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.chartDataSource);
        }, 3000);
      })
    }
  },
}
</script>