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
  width:15vw;
  height:auto;
}

.buruburu {
    -webkit-animation:buruburu 0.1s infinite linear alternate;
    animation:buruburu 0.1s infinite linear alternate;
}

@-webkit-keyframes buruburu {
    0% {-webkit-transform:translate(0, 0) rotate(-3deg);}
    50% {-webkit-transform:translate(0, -1px) rotate(0deg);}
    100% {-webkit-transform:translate(0, 0)rotate(3deg);}
}

@keyframes buruburu {
    0% {transform:translate(0, 0) rotate(-3deg);}
    50% {transform:translate(0, -1px) rotate(0deg);}
    100% {transform:translate(0, 0)rotate(3deg);}
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
