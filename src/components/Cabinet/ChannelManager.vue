<template>
  <v-container ma-0>
    <v-row>
      <v-col class="pa-1">
        <v-menu bottom offset-y nudge-right="50px">
          <template v-slot:activator="{ on: menu }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  color="success"
                  small fab
                  v-on="{ ...tooltip, ...menu }"
                  :disabled="channels.length===maxChannels||channelList.length===0"
                >
                  <v-icon>fa-plus-circle</v-icon>
                </v-btn>
              </template>
              <span>{{$t('Products.Channels.AddChannel')}}</span>
            </v-tooltip>
          </template>
          <v-list>
            <v-list-item
              v-for="channel in channelList"
              :key="channel.channelId"
              @click="addChannel(channel)"
            >
              <v-list-item-title>{{ channel.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-1"
      v-for="channel in channels"
      :key="channel.id">
        <ChannelViewer :channel="channel" :showRemoveButton="true"
        v-on:remove:channel="removeChannel($event)"
        v-on:clicked:channelItem="handleChannelItemClick"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ChannelViewer from './ChannelViewer'
export default {
  name: 'ChannelManager',
  components: { ChannelViewer },
  data(){
    return {
      nextId: 1,
      maxChannels: 10,
      channels: [
        { id: 0, title: 'Channel #0', default: true }
      ],
      channelList: [
        { channelId: 1, title: 'Channel #1' },
        { channelId: 2, title: 'Channel #2' },
        { channelId: 3, title: 'Channel #3' },
        { channelId: 4, title: 'Channel #4' },
      ],
    }
  },
  mounted(){
    if(window.localStorage.channelManager_channels){
      let channelList = window.localStorage.channelManager_channels.split(',')
      channelList.forEach(c => {
         this.addChannel({channelId:c})
      })
    }
  },
  methods: {
    saveChannels(){
      window.localStorage.channelManager_channels = this.channels.map(c=>{return c.channelId}).join(',')
    },
    addChannel(channel){
      let channelToAdd = this.channelList.find(c=>{return c.channelId==channel.channelId})
      if(channelToAdd){
        this.channels.push(Object.assign({id: this.nextId++},channelToAdd))
        this.saveChannels()
      }
    },
    removeChannel(channel){
      let channelIndex = this.channels.findIndex(c=>{return c.id==channel.id})
      if(channelIndex > -1){
        this.channels.splice(channelIndex,1)
        this.saveChannels()
      }
    },
    handleChannelItemClick(payload){
      this.$log('clicked'+JSON.stringify(payload))
    }
  }
}
</script>