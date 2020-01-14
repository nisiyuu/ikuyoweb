<template>
  <div>
    <loading v-show="screenloading"/>
    <div v-show="!screenloading" class="activemain">  
      <v-container>
        <v-row justify="end" class="pa-0 mr-2 mt-0">
          <v-col v-if="show" class="messagetop" cols=9 lg=9 md=9 sm=9>
            <img src="img/ikuyoT/main.jpg" class="collections">  
          </v-col>
        </v-row>  
        <v-row justify="end" class="mt-12 mr-2">
          <v-col cols=9 lg=9 md=9 sm=9>
            <div v-observe-visibility="{
            callback: visibilityChanged01,
            intersection: {
            threshold:0.1
            },}"
            v-bind:class='{active:isVisible01}'
            class="inactive message"
            style="text-align:center; justify;text-justify: inter-ideograph;"
            >
            生活の感度を高める<br><br><br>
            感度が高まると見え方が変わる.<br><br>
            見えなかったものが見えてくる.<br><br>
            いつも見るものが違って見える.<br><br><br>
            そんな体験をikuyoとともに.
            </div>
            <div v-observe-visibility="{
            callback: visibilityChanged02,
            intersection: {
            threshold: 0.1,
            }}"
            v-bind:class='{active:isVisible02}'
            class="inactive">
            <img src="img/ikuyoT/2.jpg" class="collections">
            </div>
            <div v-observe-visibility="{
            callback: visibilityChanged03,
            intersection: {
            threshold: 0.1,
            }}"
            v-bind:class='{active:isVisible03}'
            class="inactive"><img src="img/ikuyoT/1.jpg" class="collections">
            </div>
          </v-col>
        </v-row>
      </v-container>
      
      <div class="toplogo">
        <vue-typer class="biglogo" text="ikuyo" :repeat='0' :type-delay='120' :pre-type-delay='5500'></vue-typer><br>
        <vue-typer class="smalllogo" text="mai hirakawa/yuki nishimine" :repeat='0' :type-delay='120' :pre-type-delay='6500'></vue-typer>
      </div>
      <div class="prescroll"><span></span><span></span><span></span>Collection</div>
      <div class="pretap"><router-link :to="{ name: 'shop' }" tag="div"><span></span>Shop</router-link></div>
    </div>
  </div>
</template>

<style scoped>
.activemain{
  animation-name:fade-inmain;
  animation-duration:3s;
  animation-delay:0s;
}
@keyframes fade-inmain {
  0% {opacity: 0; transform: translate3d(0,0,0);}
  100% {opacity: 1; transform: translate3d(0,0,0);}
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


.message{
  /* background-color: #bb8dc7; */
  color:#B759C7;
  margin-top:25%;
  font-size: calc(0.75rem + ((2vw - 4.8px) * 0.9677));
  text-align: center;
}

.messagetop{
  /* background-color: #bb8dc7; */
  color:#B759C7;
  margin-top:20%;
  font-size: calc(0.75rem + ((2vw - 4.8px) * 0.9677));
  text-align: center;
}


.toplogo{
  transform: rotate(-90deg);
  position:fixed;
  bottom:30%;
  right:1%;
  width:auto;
  height:auto;
}

.biglogo{
  font-weight:700;
  /* font-size:400%; */
  font-size: calc(0.75rem + ((13vw - 4.8px) * 0.9677));
}

.smalllogo{
  /* font-size:120%; */
  font-size: calc(0.75rem + ((3vw - 4.8px) * 0.9677));

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