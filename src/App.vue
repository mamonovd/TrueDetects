<template>
  <v-app v-bind="theme">
    <v-app-bar app color="light-blue darken-1" dense elevate-on-scroll>
        <v-toolbar-title>{{ $t($router.currentRoute.meta.title)[$router.currentRoute.meta.title] }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn v-for="(item, i) in items"
            :key="i"
            @click="route(item)"
            text dark color="white">{{ item.title }}</v-btn>
        </v-toolbar-items>
    </v-app-bar>
    <v-content>
          <v-container fluid pa-0>
              <router-view></router-view>
          </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  version: '0.0.1a',
  data() {
    return {
      items: [
        { title: 'Home', name: 'Home' },
        { title: 'Cabinet', name: 'Cabinet' },
        { title: 'Blog', name: 'Blog' }
      ]
    }
  },
  computed: {
    theme(){
      return {
      'light': this.$store.state.theme == 'light',
      'dark': this.$store.state.theme == 'dark'
      }
    },
    showNavigationDrawer(){
      return this.$router.currentRoute.meta.showNavigationDrawer
    }
  },
  methods: {
    route(item){
      if(this.$router.currentRoute.matched.filter(r=>{return r.name==item.name}).length==0)
        this.$router.push(item)
    }
  },
}
</script>

<style lang="css">
 tr.selected-row {
    background-color: #B39DDB !important;
}
.flex-row-no-wrap {
  -ms-flex-wrap: nowrap !important;
  flex-wrap: nowrap !important;
}
</style>