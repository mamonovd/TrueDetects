<template>
  <v-container fluid pa-0>
    <v-layout row mr-0 ml-0 class="flex-row-no-wrap">
        <v-flex shrink>
          <v-navigation-drawer
            class="blue lighten-3"
            expand-on-hover>
            <v-list
                nav
                dense
            >
              <v-list-item link
                v-for="item in cabinetItems"
                :key="item.title"
                :to="item"
              >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-flex>
        <v-flex>
          <v-container fluid pa-0>
              <router-view></router-view>
          </v-container>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Cabinet',
  data(){
    return {
      tab: null,
      cabinetItems: [
        { title: 'Products', icon: 'fa-chart-line', name: 'Products' },
        { title: 'Billing', icon: 'fa-money-bill', name: 'Billing' },
        { title: 'Support', icon: 'fa-headset', name: 'Support' },
        { title: 'Affilate', icon: 'fa-user-plus', name: 'Affilate' },
        { title: 'Account', icon: 'fa-user', name: 'Account' }
      ]
    }
  },
  mounted() {
    if(this.$router.currentRoute.matched.filter(r=>{return r.name=='Cabinet'}).length<2)
      this.$router.push({name: 'Products'})
  }
}
</script>