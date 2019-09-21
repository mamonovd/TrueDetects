<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-data-table
            hide-default-footer
            disable-pagination
            :headers="headers"
            :items="items"
            :no-data-text="$t('Common.NoDataAvailable')"
            class="elevation-3"
            item-key="id"
            fixed-header
            height="600px"
            :search="search"
            dense
          >
            <template v-slot:top>
              <v-text-field
                v-model="search"
                prepend-inner-icon="fa-search"
                label="Search"
                hide-details
                outlined rounded
                clearable clear-icon="fa-times"
              >
              </v-text-field>
            </template>
            <template v-slot:item="{item}">
              <tr @click="fillDetail(item)" :class="item.id==selectedItem.id?'selected-row':'regular-row'">
                <td>{{ item.id }}</td>
                <td>{{ item.col2 }}</td>
                <td>{{ item.col3 }}</td>
                <td>{{ item.col4 }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
        <v-col>
          <v-container pa-0>
            <v-row>
              <v-col class="pa-0">
                <v-card>
                  <v-overlay
                    absolute
                    opacity="0.1"
                    :value="loadingChart"
                    z-index="5"
                  >
                    <v-progress-circular :color="loadingColor" indeterminate size="64"></v-progress-circular>
                  </v-overlay>
                  <div style="height: 400px;">
                    <TradingView :item="selectedItem" :loadingChart.sync="loadingChart"/>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pl-0 pr-0 pb-0">
                <v-data-table
                  hide-default-footer
                  disable-pagination
                  :headers="detailHeaders"
                  :items="detailItems"
                  :no-data-text="$t('Common.SelectRecord')"
                  class="elevation-3"
                  item-key="id"
                  fixed-header
                  height="200px"
                  :loading="loadingDetails"
                  :loading-text="$t('Common.LoadingPleaseWait')"
                >
                  <template v-slot:progress>
                    <v-progress-linear :color="loadingColor" height="3" indeterminate></v-progress-linear>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { setTimeout } from 'timers'
import TradingView from './TradingView'
export default {
  name: 'MasterDetailTable',
  components: { TradingView },
  data(){
    return {
      search: '',
      loadingDetails: false,
      loadingChart: false,
      loadingColor: '#B39DDB',
      headers: [
        { text: 'col1', value: 'id' },
        { text: 'col2', value: 'col2' },
        { text: 'col3', value: 'col3' },
        { text: 'col4', value: 'col4' },
      ],
      items: [
      ],
      selectedItem: {},
      detailHeaders: [
        { text: 'col1', value: 'colext1' },
        { text: 'col2', value: 'colext2' },
        { text: 'col3', value: 'colext3' },
        { text: 'col4', value: 'colext4' },
      ],
      detailItems: [
      ],
    }
  },
  mounted(){
    this.initSampleData()
  },
  methods: {
    initSampleData(){
      for(let i=1;i<100;i++){
        this.items.push({
          id: i,
          col2: 'asd'+i,
          col3: 'fgh'+i,
          col4: 'jkl'+i,
          extdata: [{
            id: 1,
            colext1: 'ext11_'+i,
            colext2: 'ext21_'+i,
            colext3: 'ext31_'+i,
            colext4: 'ext41_'+i,
          },{
            id: 2,
            colext1: 'ext12_'+i,
            colext2: 'ext22_'+i,
            colext3: 'ext32_'+i,
            colext4: 'ext42_'+i,
          }]
        })
      }
    },
    async loadDetails(item){
      this.loadingDetails = true
      this.selectedItem = item
      this.detailItems = []
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(item.extdata);
        }, 500);
      })
    },
    fillDetail(item){
      this.loadDetails(item).then(data => {
        this.loadingDetails = false
        this.detailItems = data
      })
    }
  },
}
</script>
