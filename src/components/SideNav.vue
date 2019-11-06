<template>
    <v-navigation-drawer v-model="$store.state.drawer" absolute temporary>
      <!-- ログインの時のアイコン -->
      <!-- <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img v-if="photoURL" :src="photoURL">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ userName }}</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list> -->

      <v-list class="pt-0" dense>
        <!-- <v-divider></v-divider> -->

        <v-list-tile v-for="item in items" :key="item.title" :to="item.link">
          <!-- <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action> -->

          <v-list-item-content>
            <div style="color:gray">
            {{ item.title }}
            </div>
          </v-list-item-content>
        </v-list-tile>
      </v-list>



      <!-- login_userが存在する場合の飲み表示 -->
      <!-- <v-list v-if="$store.state.login_user">
        <v-btn icon @click="logout">
            <img src="../../public/img/logout.png" width="20px" height="20px">
        </v-btn>
      </v-list> -->

      <v-list v-if="$store.state.login_user">
      <v-btn icon>
      <router-link :to="{name: 'shop_item_cart'}">
        <img src="../../public/img/cartimg.png" width="20px" height="20px">
      </router-link>
      </v-btn>
    </v-list>

      <v-btn icon href="https://www.instagram.com/ikuyo_club/?hl=ja">
        <img src="../../public/img/instagram.png" width="20px" height="20px">
      </v-btn>

      <v-btn icon>
        <img src="../../public/img/twitter.png" width="20px" height="20px">
      </v-btn>

    </v-navigation-drawer>
  <!-- </v-layout> -->
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import firebase from 'firebase'
export default {
  data () {
    return {
      items: [
        { title: 'HOME', icon: 'home', link: { name:'home'}},
        { title: 'SHOP', icon: 'list',link:{ name : 'shop'} },
        // { title: 'CONTACT', icon: 'list',link:{ name : 'addresses'} }
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
