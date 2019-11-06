<template>
  <v-app>
    <v-toolbar app flat color=transparent>
      <v-toolbar-side-icon @click.stop="toggleSideMenu" v-show="!this.$store.state.loading">
        <img src="img/varcord.jpg" class="varcord">
      </v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title style="opacity:0.5" v-show="!this.$store.state.loading">ikuyo</v-toolbar-title>
    </v-toolbar>
    <SideNav/>
  
    <Loading v-show="this.$store.state.loading"/>
      <router-view v-show="!this.$store.state.loading"/> 
      <!-- <Footer></Footer> -->
  </v-app>
</template>

<style>
.application--wrap{
  background-color:white;
  font-family: 'YuGothic';
}

/* 共通のglichエフェクト */
.glichwrap{
  background-color:white;
  animation: flash .1s infinite;
  /* background-image: url("./assets/sweat.png");
  background-size: 100%;
  background-position-y: 100px; */

  /* ,skew 3s infinite,glitch 1.5s both infinite; */
  /* background-image: url("../public/img/ikuyo_back.jpg");
  background-size: 400%;

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

/* バーコード */
.varcord{
  width:150%;
  height: 150%;
  opacity: 0.5;
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
import firebase from 'firebase'

export default {
  name: 'App',
  components: {
    SideNav,
    Footer,
    Loading,
  },
  data () {
    return {
      //
    }
  },
  // watch: {
  //   $route() {
  //     // アニメーションの切り替え
  //     // if (to.meta.index > from.meta.index) {
  //     //   this.transition.enter = '進むときのenterアニメーション';
  //     //   this.transition.leave = '進むときのleaveアニメーション';
  //     // } else {
  //     //   this.transition.enter = '戻るときのenterアニメーション';
  //     //   this.transition.leave = '戻るときのleaveアニメーション';
  //     // }
  //     if(this.$store.state.is_loading)
  //     this.$store.dispatch('setLoading', false);
      
  //   },
  // },
  methods: {
    ...mapActions(['toggleSideMenu', 'setLoginUser','logout','deleteLoginUser','fetchProducts'])
  },
  
  // created(){
  //     this.$store.dispatch('setLoading', false)
  // },

//   mounted() {
//   this.$nextTick(function () {
//     // ビュー全体がレンダリングされた後にのみ実行されるコード
//     this.$store.dispatch('setLoading', false)
//   })
// }
   
    // firebase.auth().onAuthStateChanged(user => {
    // if(user){
    //   this.setLoginUser(user)
    //   this.fetchProducts()
    //   if(this.$router.currentRoute.name === 'cart') this.$router.push({name:'cart' })
    // }else{
    //   this.deleteLoginUser()
    //   this.$router.push({name:'home'})

}
</script>
