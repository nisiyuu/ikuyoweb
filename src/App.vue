<template>
  <v-app id="font">
    <v-app-bar app flat color="transparent" style="position:fixed;top:3%;left:0;">
      <div @click.stop="toggleSideMenu">
        <img src="img/varcord.jpg" class="varcord">
      </div>
    </v-app-bar>
    <SideNav></SideNav>
    
    <transition name="fade" appear>
      <router-view/> 
    </transition>
  </v-app>
</template>

<style>
#font{
  font-family: 'Noto Sans JP', sans-serif;
  font-family: 'Roboto', sans-serif;
}

@import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP|Roboto&display=swap');/* バーコード */
.varcord{
  opacity: 0.6;
  max-width: 80px;
  height:auto;
  margin-left:10%;
}

</style>

<script>
import SideNav from './components/SideNav'
import Loading from './views/loading.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    SideNav,
  },
  methods: {
    ...mapActions(['toggleSideMenu'])
  },
}
</script>
