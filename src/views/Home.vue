<template>
  <div>
    <loading v-show="screenloading"/>
    <div v-show="!screenloading" class="activemain">  
      <v-container>
        <v-row justify="end" class="pa-0 mr-2 mt-0">
          <v-col v-if="show" class="messagetop" cols=9 lg=9 md=9 sm=9>
            <v-col cols=12 lg=6 md=6 sm=7 class="pa-0 ma-0">
            <img src="img/ikuyoT/main.jpg" class="collections">
            </v-col>
          </v-col>
        </v-row>  
        <v-row justify="end" class="mt-12 mr-2">
          <v-col cols=9 lg=9 md=9 sm=9>
            <v-col cols=12 lg=6 md=6 sm=6 class="pa-0 ma-0">
            <div v-observe-visibility="{
            callback: visibilityChanged01,
            intersection: {
            threshold:0.1
            },}"
            v-bind:class='{active:isVisible01}'
            class="inactive message"
            >
            生活の感度を高める<br><br><br>
            感度が高まると見え方が変わる.<br><br>
            見えなかったものが見えてくる.<br><br>
            いつも見るものが違って見える.<br><br><br>
            そんな体験をikuyoとともに.
            </div>
            </v-col>
            <v-col cols=12 lg=6 md=6 sm=7 class="pa-0 ma-0">
            <div v-observe-visibility="{
            callback: visibilityChanged02,
            intersection: {
            threshold: 0.1,
            }}"
            v-bind:class='{active:isVisible02}'
            class="inactive message">
            <img src="img/ikuyoT/2.jpg" class="collections">
            </div>
            </v-col>
            <v-col cols=12 lg=6 md=6 sm=7 class="pa-0 ma-0">
            <div v-observe-visibility="{
            callback: visibilityChanged03,
            intersection: {
            threshold: 0.1,
            }}"
            v-bind:class='{active:isVisible03}'
            class="inactive message"><img src="img/ikuyoT/1.jpg" class="collections">
            </div>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
      
      <div class="toplogo">
        <vue-typer class="biglogo" text="ikuyo" :repeat='0' :type-delay='120' :pre-type-delay='5500'></vue-typer><br>
        <vue-typer class="smalllogo" text="mai hirakawa/yuki nishimine" :repeat='0' :type-delay='120' :pre-type-delay='6500'></vue-typer><br>
        <router-link :to="{ name: 'about' }"><vue-typer class="aboutus buruburu" text="About us" :type-delay='120' :repeat='0' :pre-type-delay='10000'></vue-typer></router-link>
      </div>
        <div class="arrowWrap">
        <div class="arrowInner">
          <p>COLLECTION</p>
        <div class="arrow"></div>
      </div>
      </div>
      
      <div class="pretap"><router-link :to="{ name: 'shop' }" tag="div"><span></span>Shop</router-link></div>
    </div>
  </div>
</template>

<style scoped>
.buruburu{
    display: inline-block;
    animation-name:hurueru;
    animation-duration:.5s;
    animation-iteration-count:infinite;
    animation-delay:8s;
}

@keyframes hurueru {
    0% {transform: translate(0px, 0px) rotateZ(0deg)}
    25% {transform: translate(2px, 2px) rotateZ(1deg)}
    50% {transform: translate(0px, 2px) rotateZ(0deg)}
    75% {transform: translate(2px, 0px) rotateZ(-1deg)}
    100% {transform: translate(0px, 0px) rotateZ(0deg)}
}

.collections{
  width:100%;
  height:auto;
}

@media screen and (min-width:480px) {
  .message{
    color:#B759C7;
    margin-top:25%;
    font-size: calc(0.75rem + ((0.8vw - 4.8px) * 0.9677));
    text-align: center;
  }
  .messagetop{
    color:#B759C7;
    margin-top:5%;
    font-size: calc(0.75rem + ((2vw - 4.8px) * 0.9677));
    text-align: center;
  }
  .biglogo{
    font-weight:700;
    font-size: calc(0.75rem + ((10vw - 4.8px) * 0.9677));
  }
  .aboutus{
    background-color:#B759C7;
  }
  .pretap{
    color:#B759C7;
    font-weight:700;
    font-size:16px;
    position: fixed;
    bottom: 40%;
    left: 10%;
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

  /* アニメーション設定 */
.arrowWrap {
  position: fixed;
  right: 33%;
  bottom: 0;
  height: 200px
}

.arrowInner p {
  font-size: 12px;
  font-weight: 900;
  color:#B759C7;
  text-align: end;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.arrow {
  width: 1px;
  height: 100px;
  margin: 50px auto 0;
  background-color: #eee;
  position: relative;
  overflow: hidden;
}

.arrow::before {
  content: '';
  width: 1px;
  height: 100px;
  margin: 50px auto 0;
  background-color: #B759C7;
  position: absolute;
  top: -150px;
  left: 0;
  -webkit-animation: arrow 2.0s ease 0s infinite normal;
  animation: arrow 2.0s ease 0s infinite normal;
}

@keyframes arrow {
  0% {
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
  }

  60% {
    -webkit-transform: translate3d(-50%, 100px, 0);
    transform: translate3d(-50%, 100px, 0);
  }

  100% {
    -webkit-transform: translate3d(-50%, 100px, 0);
    transform: translate3d(-50%, 100px, 0);
  }
}



}

@media screen and (max-width:480px) {
  .message{
    color:#B759C7;
    margin-top:25%;
    font-size: calc(0.75rem + ((1.3vw - 4.8px) * 0.9677));
    text-align: center;
  }
  .messagetop{
    color:#B759C7;
    margin-top:20%;
    font-size: calc(0.75rem + ((2vw - 4.8px) * 0.9677));
    text-align: center;
  }
  .biglogo{
    font-weight:700;
    font-size: calc(0.75rem + ((13vw - 4.8px) * 0.9677));
  }
  /* 矢印 */
  .pretap{
  color:#B759C7;
  font-weight:700;
  font-size:16px;
  position: fixed;
  bottom: 45%;
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

.arrowWrap {
  display: none;
}

.arrowInner p {
  display: none
}

.arrow {
  display: none;
}


}

.toplogo{
  transform: rotate(-90deg);
  position:fixed;
  bottom:30%;
  right:1%;
  width:auto;
  height:auto;
}
.smalllogo{
  font-size: calc(0.75rem + ((3vw - 4.8px) * 0.9677));
}

.aboutus{
  font-size: calc(0.75rem + ((1.5vw - 4.8px) * 0.9677));
  background-color:#B759C7;
}


.inactive{
  opacity:0;
  margin-top: 30%;
  margin-bottom:50%;
}
.active{
  animation-name:fade-in;
  animation-duration:2.5s;
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

.activemain{
  animation-name:fade-inmain;
  animation-duration:3s;
  animation-delay:0s;
}
@keyframes fade-inmain {
  0% {opacity: 0; transform: translate3d(0,0,0);}
  100% {opacity: 1; transform: translate3d(0,0,0);}
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




</style>

<script>
import { VueTyper } from 'vue-typer'
import { ObserveVisibility }from 'vue-observe-visibility'
import loading from './loading.vue'

export default {
  components:{
    VueTyper,
    ObserveVisibility,
    loading,
  },
  data(){
    return{
      screenloading:true,
      show:true,
      collections: ['img/ikuyoT/main.jpg', 'img/ikuyoT/2.jpg'],
      isVisible:true,
      isVisible01: false,
      isVisible02: false,
      isVisible03: false
    }
  },
  mounted(){
    const self = this;
    this.$nextTick(function () {
      setTimeout(() => {self.screenloading = false},2000)
    })
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

https://www.nxworld.net/tips/css-scroll-down-button.html
矢印