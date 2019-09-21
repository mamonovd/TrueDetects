<template>
  <div id="marketVolume" class="chart"></div>  
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'MarketVolumesChart',
  data() {
    return {
      chart: undefined,
      chartHeight: 700,
      chartWidth: 700,
      series: {},
      colorBuy: '#81C784',
      colorSell: '#E57373',
      colorBuyExtra: '#1B5E20',
      colorSellExtra: '#B71C1C',
      colorBuyNewNode: '#1B5E20',
      colorSellNewNode: '#B71C1C',
      nodeValueScale: 100,
      colorCommon: '#BDBDBD',
      newNodeColorTimeout: 10000,
      defChartData: [
        {name: "XRPBTC", volBuy: 3.2, volSell: 5.9},
        {name: "WANBTC", volBuy: 1.2, volSell: 4.3},
        {name: "LTCBTC", volBuy: 3.6, volSell: 1.7},
        {name: "VIBEBTC", volBuy: 5.8, volSell: 2.4},
        {name: "ETHBTC", volBuy: 4.2, volSell: 5.9},
        {name: "BCHABCBTC", volBuy: 1.2, volSell: 0.9},
        {name: "BNBBTC", volBuy: 2.2, volSell: 2.9},
      ]
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.initData(this.defChartData)
    })
  },
  methods: {
    prepareNode(v){
      Object.assign(v, {
        name: v.name.replace('BTC', ''),
        value: Math.floor((v.volBuy + v.volSell) * this.nodeValueScale),
        volSumm: (v.volBuy + v.volSell),
        coloredAsNew: false
      })
      if(v.buyExtra) v.color = this.colorBuyExtra
      else if(v.sellExtra) v.color = this.colorSellExtra
      else if(v.volBuy > v.volSell) v.color = this.colorBuy
      else v.color = this.colorSell
    },
    initData(data) {
      // {name: "XRPBTC", volBuy: 0.6, volSell: 0.2, buyExtra: false, sellExtra: false}
      let dataCommon = [] // 
      data.forEach(v => {
        this.prepareNode(v)
        if(v.volSumm > 0){
          dataCommon.push(v)
          this.series[v.name] = 0
        }
      });
      // eslint-disable-next-line
      this.chart = new Highcharts.chart(this.initOptions([{
            name: this.$t('MarketVolumesChart.ActiveVolumes'),
            color: this.colorCommon,
            data: dataCommon
      }]))
      this.chart.setSize(this.chartHeight,this.chartWidth)
    },
    initOptions(series) {
      return {
        chart: {
          renderTo: 'marketVolume',
          type: 'packedbubble',
          height: '80%',
          boost: {
            useGPUTranslations: true
          }
        },
        title: {
          text: this.$t('MarketVolumesChart.BinanceVolumesScan')
        },
        tooltip: {
          headerFormat: '',
          useHTML: true,
          pointFormat: '<b>{point.name}</b> bv:{point.volBuy} / sv:{point.volSell} ' + this.$t('MarketVolumesChart.In3Minutes')
        },
        plotOptions: {
          series: {
            animation: {
              duration: 300
            }
          },
          packedbubble: {
            minSize: '30%',
            maxSize: '70%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
              gravitationalConstant: 0.01,
              splitSeries: true,
              seriesInteraction: false,
              dragBetweenSeries: false,
              parentNodeLimit: true
            },
            dataLabels: {
              enabled: true,
              align: 'center',
              format: '<b>{point.name}</b><br/><span style="font-size:9px">{point.volBuy}</span><br/><span style="font-size:9px">{point.volSell}</span>',
              style: {
                color: 'black',
                textOutline: 'none',
                fontWeight: 'normal'
              }
            }
          }
        },
        series: series
      }
    },
    getSerieForNode(node){
      return node.volSumm>0.1?0:undefined
    },
    getNode(v){
      let homeSerie = this.series[v.name]
      let node = undefined
      if(homeSerie!==undefined){
        node = this.chart.series[homeSerie].data.filter(x => {return x.name===v.name}) // Highcharts object
        if(node.length > 0) node = node[0]
        else node = undefined
      }
      return node
    },
    updateData(v){
      if(this.chart !== undefined){
        this.prepareNode(v)
        let homeSerie = this.series[v.name]
        let node = this.getNode(v)
        let newHomeSerie = this.getSerieForNode(v)
        if(newHomeSerie===undefined){
          if(node!==undefined){
            node.remove()
            delete(this.series[v.name])
          }
        } else if(node===undefined) {
          // add
          v.coloredAsNew = true
          v.color = (v.color===this.colorBuy?this.colorBuyNewNode:this.colorSellNewNode)
          this.chart.series[newHomeSerie].addPoint(v)
          this.series[v.name] = newHomeSerie
          setTimeout(this.resetNodeColor, this.newNodeColorTimeout, v, this)
        } else {
          if(node.coloredAsNew){
            v.coloredAsNew = true
            v.color = (v.color===this.colorBuy?this.colorBuyNewNode:this.colorSellNewNode)
          }
          if(newHomeSerie !== homeSerie){
            // update options and serie
            node.remove()
            this.chart.series[newHomeSerie].addPoint(v)
            this.series[v.name] = newHomeSerie
          } else {
            // update options
            if(node.value !== v.value ||
                node.buyExtra !== v.buyExtra || node.sellExtra !== v.sellExtra ||
                node.volBuy !== v.volBuy || node.volSell !== v.volSell)
              node.update(v)
          }
        }
      }
    },
    resetNodeColor(v, self){
      self.prepareNode(v)
      let node = self.getNode(v)
      if(node!==undefined){
        self.prepareNode(node)
        node.update({color:node.color, coloredAsNew: false})
      }
    }
  }
}
</script>
<style>
#marketVolume {
	margin: 0 auto;
}
</style>