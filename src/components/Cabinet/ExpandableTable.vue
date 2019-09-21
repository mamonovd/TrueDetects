<template>
  <div>
    <v-card>
      <v-card-title class="pa-0 justify-center">
        {{ title }}
      </v-card-title>
      <v-card-text class="pa-0">
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
          @click:row="handleClickRow"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              prepend-inner-icon="fa-search"
              label="Search pair"
              hide-details
              outlined rounded
              clearable clear-icon="fa-times"
              class="pb-1"
            >
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
    title: {
      type: String,
      required: true,
    }
  },
  components: { TextParser },
  data () {
    return {
      search: '',
      expanded: [],
      headers: [
        { text: 'pair', value: 'pair' },
      ],
      items: [
      ],
    }
  },
  mounted(){
    this.initSampleData()
  },
  methods: {
    initSampleData(){
      for(let i=1;i<100;i++){
        this.addItem({
          id: i,
          pair: 'asd'+i,
          extdata: "†blue‡#TAGME‡†br‡Peek-†b‡a‡-boo!†br‡†trDown‡ some score †trUp‡ †br‡†trash‡†chart‡†top‡†signal_strength‡"
        })        
      }
    },
    addItem(item){
      this.items.push(item)
      this.expanded.push(item)
    },
    handleClickRow(item){
      console.log('clicked'+JSON.stringify(item))
    }
  }
}
</script>
<style>
div.v-data-table.row-color-blue td.text-start {
  color: blue;
  cursor: pointer;
}

</style>