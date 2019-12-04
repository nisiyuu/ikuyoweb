<template>
  <div class="all">
  <v-container>
  <v-row justify="end" class="pa-0">
  <transition>
  <v-col v-if="show" class="message" cols=9 lg=9 md=9 sm=9 style="text-align: justify;text-justify: inter-ideograph;">
    ＃＃＃サンプル＃＃＃コンセプトは”" 。
    シーズン毎にテーマを設定し、それに沿ったオリジナルのストーリーをイラストやコミックでも展開。自らの世界観をニュートラルな視点で表現する。
    時として周りの環境や常識、仕来りにより生まれてくる感情と、自発的に生まれてきた意志とが対極に存在することがある。 私たちは常に、このような意志と感情の間で揺れ動いている。 しかし、そんな狭間にある不安定な状態こそが最も美しいのではないだろうか。
    時として周りの環境や常識、仕来りにより生まれてくる感情と、自発的に生まれてきた意志とが対極に存在することがある。 私たちは常に、このような意志と感情の間で揺れ動いている。 しかし、そんな狭間にある不安定な状態こそが最も美しいのではないだろうか。    
  </v-col>
  </transition>
  </v-row>  
 
  <v-row justify="end" class="mt-12">
  <v-col cols=9 lg=9 md=9 sm=9>
    <!-- <span v-for="(collection, key) in collections" :key="key"><img :src="collection" class="collections"></span> -->
   <div v-observe-visibility="{
     callback: visibilityChanged01,
     intersection: {
       threshold:0.1
     },}"
     v-bind:class='{active:isVisible01}'
     class="inactive"
    ><img src="img/ikuyoT/main.jpg" class="collections"></div>

    <div v-observe-visibility="{
      callback: visibilityChanged02,
      intersection: {
        threshold: 0.1,
      }}"
    v-bind:class='{active:isVisible02}'
    class="inactive"><img src="img/ikuyoT/2.jpg" class="collections"></div>

    <div v-observe-visibility="{
      callback: visibilityChanged03,
      intersection: {
        threshold: 0.1,
      }}"
    v-bind:class='{active:isVisible03}'
    class="inactive"><img src="img/ikuyoT/1.jpg" class="collections"></div>

</v-col>
  </v-row>

  </v-container>

  <div class="toplogo">
  <vue-typer class="biglogo" text="ikuyo" :repeat='0' :type-delay='120' :pre-type-delay='2000'></vue-typer><br>
  <vue-typer class="smalllogo" text="mai hirakawa/yuki nishimine" :repeat='0' :type-delay='120' :pre-type-delay='3000'></vue-typer>
  </div>

  <div class="prescroll"><span></span><span></span><span></span>Collection</div>

  <div class="pretap"><router-link :to="{ name: 'shop' }" tag="div"><span></span>Shop</router-link></div>

  </div>
 

</template>

<style scoped>
.fade-enter{
  opacity: 0;
}

.fade-leave-to{
  transform: translateX(100px)
}

.fade-enter-active{
  transition: opacity 4s;
}

.fade-leave-active {
  transition: transform 4s ease-in;
}


.collections{
  width:100%;
  height:auto;
}

.prescroll{
  color:#B759C7;
  position: fixed;
  top: 90%;
  left: 50%;
  z-index: 2;
  display: inline-block;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  text-decoration: none;
  padding-top: 65px;
}
.prescroll span {
  position: fixed;
  top: 0;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-left: -12px;
  border-left: 1px solid #B759C7;
  border-bottom: 1px solid #B759C7;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: sdb 2s infinite;
  animation: sdb 2s infinite;
  box-sizing: border-box;
}

.prescroll span:nth-of-type(1) {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.prescroll span:nth-of-type(2) {
  top: 16px;
  -webkit-animation-delay: .15s;
  animation-delay: .15s;
}
.prescroll span:nth-of-type(3) {
  top: 32px;
  -webkit-animation-delay: .3s;
  animation-delay: .3s;
}


.pretap{
  color:#B759C7;
  position: fixed;
  bottom: 50%;
  left: 35px;
  z-index: 2;
  display: inline-block;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-270deg);
  text-decoration: none;
  padding-top: 40px;
}
.pretap span {
  position: fixed;
  top: 0;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-left: -12px;
  border-left: 1px solid #B759C7;
  border-bottom: 1px solid #B759C7;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: sdb 2s infinite;
  animation: sdb 2s infinite;
  box-sizing: border-box;
}


@-webkit-keyframes sdb {
  0% {
    -webkit-transform: rotate(-45deg) translate(0, 0);
  }
  20% {
    -webkit-transform: rotate(-45deg) translate(-10px, 10px);
  }
  40% {
    -webkit-transform: rotate(-45deg) translate(0, 0);
  }
}
@keyframes sdb {
  0% {
    transform: rotate(-45deg) translate(0, 0);
  }
  20% {
    transform: rotate(-45deg) translate(-10px, 10px);
  }
  40% {
    transform: rotate(-45deg) translate(0, 0);
  }
}



.all{
  font-family:LTUnivers,SystemSerif,"a-otf-futo-go-b101-pr6n",MyHiragino,"メイリオ",Meiryo,Osaka,"MS UI Gothic","ＭＳ Ｐゴシック","MS PGothic",sans-serif;
}


/* .allow{
  position: fixed;
  top:30%;
  right:0;
  width:auto;
  height:auto;
} */

.message{
  /* background-color: #bb8dc7; */
  color:#B759C7;
}

.toplogo{
  transform: rotate(-90deg);
  position:fixed;
  top:50%;
  right:1%;
  width:auto;
  height:auto;
}

.biglogo{
  font-weight:700;
  font-size:400%;
}

.smalllogo{
  font-size:120%;
}

.video{
  width:100%;
  height:100%;
  /* position: relative; */
  text-align: center;
  color:#B759C7;
}

.varcord{
  width: auto;
  height: auto;
}

.inactive{
  opacity:0;
  margin-top: 30%;
  margin-bottom:50%;
}

.active{
  animation-name:fade-in;
  animation-duration:0.8s;
  animation-timing-function: ease-out;
  animation-delay:0s;
  animation-iteration-count:1;
  animation-direction:normal;
  animation-fill-mode: forwards;
}

@keyframes fade-in {
  0% {opacity: 0; transform: translate3d(0,-20px,0);}
  100% {opacity: 1; transform: translate3d(0,0,0);}
}

</style>

<script>
// import store from '../store.js'//https://tackeyy.com/blog/posts/how-to-access-store-in-vue-router-at-before-enter
import { VueTyper } from 'vue-typer'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { ObserveVisibility }from 'vue-observe-visibility'

export default {
  components:{
    VueTyper,
    ObserveVisibility
  },
  data(){
    return{
      show:true,
      collections: ['img/ikuyoT/main.jpg', 'img/ikuyoT/2.jpg'],
      isVisible01: false,
      isVisible02: false,
      isVisible03: false
    }
  },
   methods: {
      visibilityChanged01(isVisible01, entry) {
        this.isVisible01 = isVisible01
      },
      visibilityChanged02(isVisible02, entry) {
        this.isVisible02 = isVisible02
      },
      visibilityChanged03(isVisible03, entry) {
        this.isVisible03 = isVisible03
      }
  }
}
</script>
