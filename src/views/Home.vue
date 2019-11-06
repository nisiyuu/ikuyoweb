<template>
  <div>
  <div class="homewrap">
  <video playsinline muted autoplay loop class="video" @canplaythrough="loading">
    <source src="../assets/home1028outputnew.mp4" type="video/mp4">
  </video>
  <img src="../assets/logo2.png" class="logo">
  </div>
  </div>
 

</template>

<style scoped>
.homewrap video{
  width:100%;
  height:100%;
  position: relative;
  text-align: center;
}

.logo{
  width: 100%;
  height:60%;
  position: fixed;
  top:5%;
  left:0;
  right:0;
  margin:auto;
  z-index: 3;
}

.homewrap{
  margin: 0;
  padding: 0;
  background-color:white;
  animation: homeflash .1s infinite,homeskew 3s infinite,homeglitch 1.5s both infinite;
  /* margin-top: 120px; */
  /* background-image: url("../assets/sweat.png");
  background-size: 400%; */
/* グリッチhttps://hirashimatakumi.com/blog/6303.html */
}
@keyframes homeflash {
  0% {
    opacity: 1;
    background: white;
  }
  100% {
    opacity: .8;
    background: rgb(20, 20, 20);
  }
}

@keyframes homeskew {
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

@keyframes homeglitch {
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



/* 中心画像のcss */
.img{
  width: 80%;
  height: 80%;
}
.imgsetting{
  margin-top: 100px;
  margin-bottom: 1600px;
  text-align: center;
  vertical-align: center;
}

.varcord{
  width: auto;
  height: auto;
}

/* ネオン *//* https://webdesignfacts.net/entry/guritti-css/ */
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: table;
  background-color: black;
}

@font-face {
  font-family: neon;
  src: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/707108/neon.ttf);
}

.container {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.neon {
  font-family: neon;
  color: #FB4264;
  font-size: 9vw;
  line-height: 9vw;
  text-shadow: 0 0 3vw #F40A35;
}

.flux {
  font-family: neon;
  color: #426DFB;
  font-size: 9vw;
  line-height: 9vw;
  text-shadow: 0 0 3vw #2356FF;
}

.neon {
  animation: neon 1s ease infinite;
  -moz-animation: neon 1s ease infinite;
  -webkit-animation: neon 1s ease infinite;
}

@keyframes neon {
  0%,
  100% {
    text-shadow: 0 0 1vw #ff00ff, 0 0 3vw #ff00ff, 0 0 10vw #ff00ff, 0 0 10vw #FA1C16, 0 0 .4vw #FED128, .5vw .5vw .1vw #806914;
    color: #ee82ee;
  }
  50% {
    text-shadow: 0 0 .5vw #800E0B, 0 0 1.5vw #800E0B, 0 0 5vw #800E0B, 0 0 5vw #800E0B, 0 0 .2vw #800E0B, .5vw .5vw .1vw #40340A;
    color: #806914;
  }
}

.flux {
  animation: flux 2s linear infinite;
  -moz-animation: flux 2s linear infinite;
  -webkit-animation: flux 2s linear infinite;
  -o-animation: flux 2s linear infinite;
}

@keyframes flux {
  0%,
  100% {
    text-shadow: 0 0 1vw #1041FF, 0 0 3vw #1041FF, 0 0 10vw #1041FF, 0 0 10vw #1041FF, 0 0 .4vw #8BFDFE, .5vw .5vw .1vw #147280;
    color: #28D7FE;
  }
  50% {
    text-shadow: 0 0 .5vw #082180, 0 0 1.5vw #082180, 0 0 5vw #082180, 0 0 5vw #082180, 0 0 .2vw #082180, .5vw .5vw .1vw #0A3940;
    color: #146C80;
  }
}

</style>


<script>
import store from '../store.js'//https://tackeyy.com/blog/posts/how-to-access-store-in-vue-router-at-before-enter

  export default {
    // async beforeRouteEnter(to, from, next) {
    // await store.dispatch('setLoading')
    // next()
  }
</script>
