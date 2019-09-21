<template>
  <div>
    <v-card class="elevation-5">
      <v-card-title class="pa-1 justify-center">
        {{ channel.title }}
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              color="error"
              text
              v-on="on"
              v-if="showRemoveButton && !channel.default"
              @click="$emit('remove:channel',channel)"
            >
              <v-icon>fa-minus-circle</v-icon>
            </v-btn>
          </template>
          <span>{{$t('Products.Channels.RemoveChannel')}}</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-snackbar
          v-model="snackbar"
          absolute top
        >
          {{ snackbarText }}
          <v-btn
            color="blue"
            text
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
        <v-data-table
          hide-default-footer
          hide-default-header
          dense
          disable-pagination
          :headers="headers"
          :items="items"
          :no-data-text="$t('Common.NoDataAvailable')"
          class="row-color-blue"
          item-key="id"
          fixed-header
          height="600px"
          :search="search"
          :expanded.sync="expanded"
          @click:row="$emit('clicked:channelItem',{channel,item:$event})"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              :label="$t('Products.Channels.SearchPair')"
              hide-details
              outlined rounded
              clearable clear-icon="fa-times"
              class="pb-1"
              @click:clear="resetData"
            >
              <template v-slot:prepend-inner>
                <v-tooltip bottom v-model="showSearchOnServerTooltip" transition="slide-y-transition">
                  <template v-slot:activator="{ on }">
                    <v-icon tag="a" v-on="on" @click="serverSearch"
                    :disabled="search===null"
                    :color="search===null?'grey':'primary'">fa-search</v-icon>
                  </template>
                  <span>{{$t('Products.Channels.SearchOnServer')}}</span>
                </v-tooltip>
              </template>
            </v-text-field>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length"><TextParser :text="item.extdata" /></td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import TextParser from './TextParser'
export default {
  name: 'Expandabletable',
  props: {
    channel: {
      type: Object,
      required: true,
    },
    showRemoveButton: {
      type: Boolean,
      default: false
    }
  },
  components: { TextParser },
  data () {
    return {
      search: null,
      searchArr: [],
      searchHandler: undefined,
      searchLag: 2000,
      showSearchOnServerTooltip: false,
      expanded: [],
      headers: [
        { text: 'pair', value: 'pair' },
      ],
      items: [
      ],
      snackbar: false,
      snackbarText: '',
    }
  },
  mounted(){
    this.initSampleData()
  },
  watch: {
    search(s){
      if(s!==null) this.showSearchOnServerTooltip = true
    }
  },
  methods: {
    initSampleData(){
      for(let i=1;i<100;i++){
        this.addItem({
          id: i,
          pair: 'asd'+i,
          extdata: "†color:blue‡#TAGME‡†br‡Peek-†b‡a‡-boo!†br‡†trDown‡ †color:#6A1B9A‡some score‡ †trUp‡†br‡†color:rgb(106, 27, 154)‡some score too‡†br‡†trash‡†chart‡†chart_up‡†top‡†signal_strength‡"
        })        
      }
    },
    addItem(item){
      this.items.push(item)
      this.expanded.push(item)
    },
    serverSearch(){
      this.snackbarText = 'Actualy i should search that string: ' + this.search
      this.snackbar = true
    },
    resetData() {
      this.search = null
      this.showSearchOnServerTooltip = false
      this.snackbarText = 'Actualy i should reload data from server'
      this.snackbar = true
    }
  }
}
</script>
<style>
div.v-data-table.row-color-blue tr.expanded.expanded__row {
  color: blue;
  cursor: pointer;
  background-color: #BBDEFB;
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;
}
div.v-data-table.row-color-blue tr.expanded.expanded__row:hover {
  text-decoration: underline;
  background-color: #90CAF9;
}
div.v-data-table.row-color-blue tr.expanded.expanded__content {
  background-color: #F5F5F5;
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;
}
div.v-data-table.row-color-blue tr.expanded.expanded__row:hover + tr.expanded.expanded__content {
  background-color: #E3F2FD;
}

</style>