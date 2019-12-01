<template>
    <v-navigation-drawer app v-model="$store.state.drawer" fixed temporary bottom right height="220" style="background-color:#white;">
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-content>
            <div style="color:#954399;font-weight:900;text-align:center">
            {{ item.title }}
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      items: [
        { title: 'HOME', icon: 'home', link: { path: '/'}},
        { title: 'SHOP', icon: 'list',link:{ path : '/shop'} },
        { title: 'HIT US',icon: 'list',link: {path : '/mail'}},
        { title: 'INSTAGRAM',icon: 'list',link: {path : '/instagram'}}
      ]
    }
  },
  methods: {
    ...mapActions(['logout'])
  },
  computed:{
    ...mapGetters(['userName','photoURL'])
  },
}
</script>
