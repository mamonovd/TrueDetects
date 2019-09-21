<template>
  <v-card>
    <v-tabs-slider></v-tabs-slider>
    <v-tabs v-model="tab" grow>
      <v-tab>TAB-1</v-tab>
      <v-tab>TAB-2</v-tab>
      <v-tab>TAB-3</v-tab>
      <v-tab>TAB-4</v-tab>
    </v-tabs>
    <v-tabs-items touchless v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text class="pa-1">
            <MasterDetailTable/>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text class="pa-1">
            <ChannelManager />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            TAB-3 content<br/>
            2nd line
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            TAB-4 content<br/>
            2nd line
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import MasterDetailTable from './MasterDetailTable'
import ChannelManager from './ChannelManager'
export default {
  name: 'Products',
  components: { MasterDetailTable, ChannelManager },
  data(){
    return {
      tab: null
    }
  }
}
</script>