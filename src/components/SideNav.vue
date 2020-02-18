<template>
    <v-navigation-drawer app v-model="$store.state.drawer" fixed temporary width="180" height="270" style="background-color:#white;">
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-content>
            <div style="color:#B759C7;font-weight:900;text-align:center">
            {{ item.title }}
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'HOME', icon: 'home', link: { path: '/'}},
        { title: 'SHOP', icon: 'list',link:{ path : '/shop'} },
        { title: 'ABOUT US',icon: 'list',link: {path : '/about'}},
        { title: 'CONTACT',icon: 'list',link: {path : '/mail'}},
        { title: 'INSTAGRAM',icon: 'list',link: {path : '/instagram'}}
      ]
    }
  },
}
</script>
