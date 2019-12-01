<template>
<v-app id="background" style="position: relative;">
    <v-app-bar app flat color="transparent" 
    v-if="this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.md"
    style="position:fixed;top:93%;left:45%;width:100%;height:100%;margin:0 auto;">
      <div @click.stop="toggleSideMenu" v-show="!this.$store.state.loading" style="margin:0 auto;">
        <img src="img/varcord.jpg" class="varcord">
      </div>
      <!-- <v-spacer></v-spacer> -->
    </v-app-bar>

    <v-app-bar app flat color="transparent" 
    v-if="this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl"
    right
    style="position:fixed;top:93%;left:45%;width:100%;height:100%;margin:0 auto;">
    <div @click.stop="toggleSideMenu" v-show="!this.$store.state.loading" style="margin:0 auto;">
        <img src="img/varcord.jpg" class="varcord">
      </div>
    </v-app-bar>
    <SideNav></SideNav>
    
  
    <Loading v-show="this.$store.state.loading"/>
      <router-view v-show="!this.$store.state.loading"/> 
      <!-- <Footer v-show="this.$route.path !=='/'"> -->
      <!-- </Footer> -->
      </v-app>
</template>

<style>
#background{
  width:100%;
  height:100%;
  /* background-image: linear-gradient(#954399 1px, transparent 0), */
                    /* linear-gradient(90deg, #954399 1px, transparent 0); */
  background-size: 40px 40px;
  /* background-color:#037A90; */
  font-family: 'Monoton', cursive;
}
@import url('https://fonts.googleapis.com/css?family=Monoton&display=swap');

/* 共通のglichエフェクト */
.glichwrap{
  background-color:white;
  animation: flash .1s infinite;

/* グリッチhttps://hirashimatakumi.com/blog/6303.html */
}
@keyframes flash {
  0% {
    opacity: 1;
    background: red;
  }
  100% {
    opacity: .8;
    background: white;
  }
}

@keyframes skew {
  0% {
    transform: none;
  }
  33% {
    transform: none;
  }
  33.3% {
    transform: skewX(30deg);
  }
  33.6% {
    transform: skewX(-30deg);
  }
  33.9% {
    transform: none;
  }
  66% {
    transform: none;
  }
  66.3% {
    transform: skewX(5deg);
  }
  66.6% {
    transform: skewX(-5deg);
  }
  66.9% {
    transform: none;
  }
  77% {
    transform: none;
  }
  77.3% {
    transform: skewX(15deg);
  }
  77.6% {
    transform: skewX(-15deg);
  }
  77.9% {
    transform: none;
  }
}

@keyframes glitch {
  0% {
    transform: translate(0);
  }
  12.5% {
    transform: translate(-1px, 1px);
  }
  37.5% {
    transform: translate(-1px, -1px);
  }
  62.5% {
    transform: translate(1px, 1px);
  }
  87.5% {
    transform: translate(1px, -1px);
  }
  100% {
    transform: translate(0);
  }
}

/* ロゴ */
.logo{
  opacity: 0.7;
  width:25%;
  height: 25%;
  text-align: center;
  /* animation:buruburu 0.1s infinite linear alternate; */
}

/* バーコード */
.varcord{
  /* width:50%;
  height: 50%; */
  opacity: 0.6;
  width:20vw;
  height:auto;
  transform:rotateZ(90deg)
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
    Footer,
    Loading,
  },
  methods: {
    ...mapActions(['toggleSideMenu', 'setLoginUser','logout','deleteLoginUser','fetchProducts'])
  },
}
</script>
