<template>
<v-app id="font">
    <v-app-bar app flat color="transparent" 
    style="position:fixed;top:3%;left:0;">
      <div @click.stop="toggleSideMenu" v-show="!this.$store.state.loading">
        <img src="img/varcord.jpg" class="varcord">
      </div>
      <!-- <v-spacer></v-spacer> -->
    </v-app-bar>
    <SideNav></SideNav>    
  
    <!-- <Loading v-show="this.$store.state.loading"/> -->
      <transition name="fade" appear>
      <router-view v-show="!this.$store.state.loading"/> 
      </transition>
      <!-- <Footer v-show="this.$route.path !=='/'"> -->
      <!-- </Footer> -->
      </v-app>
</template>

<style>
#background{
  /* font-family:LTUnivers,SystemSerif,"a-otf-futo-go-b101-pr6n",MyHiragino,"メイリオ",Meiryo,Osaka,"MS UI Gothic","ＭＳ Ｐゴシック","MS PGothic",sans-serif; */
  /* width:100%; */
  /* height:100%; */
  /* background-image: linear-gradient(#954399 1px, transparent 0), */
                    /* linear-gradient(90deg, #954399 1px, transparent 0); */
  /* background-size: 40px 40px; */
  /* background-color:#037A90; */
  /* font-family: 'Monoton', cursive; */
}
/* @import url('https://fonts.googleapis.com/css?family=Monoton&display=swap'); */


#font{
  font-family:LTUnivers,SystemSerif,"a-otf-futo-go-b101-pr6n",MyHiragino,"メイリオ",Meiryo,Osaka,"MS UI Gothic","ＭＳ Ｐゴシック","MS PGothic",sans-serif;
}

/* バーコード */
.varcord{
  /* width:50%;
  height: 50%; */
  opacity: 0.6;
  width:15vw;
  height:auto;
  /* animation:buruburu 0.1s infinite linear alternate; */
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
import Footer from './components/Footer'
import Loading from './views/loading.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    SideNav,
    // Footer,
    // Loading,
  },
  methods: {
    ...mapActions(['toggleSideMenu', 'setLoginUser','logout','deleteLoginUser','fetchProducts'])
  },
}
</script>
