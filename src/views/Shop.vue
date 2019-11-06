<template>
<div class>
  <div class ="center">
    <!-- <img src="img/varcord.jpg" class="buruburu"> -->
    <!-- <div><span>手工衣服</span></div>
    <div><span>选择衣服</span></div>
    <div><span>贴图</span></div>
    <div><span>记录</span></div> -->
  </div>
    
    <v-layout justify-center>
      <v-flex xs9>
    <itemlist>
    </itemlist>
      </v-flex>
    </v-layout>

  </div>

</template>

<script>
import itemlist from '../components/Itemlist.vue'
import itemutil from '../mixin/Item.js'
import store from '../store.js'

export default {
  mixins:[itemutil],
  components:{
    itemlist
  },
  computed:{
  },
  // async beforeRouteEnter(to, from, next) {
  //   await store.dispatch('setLoading')
  //   next()
  // },
}
</script>

<style>

/* //グリッチエフェクト */
/* .shopwrap{
  animation: flash .1s infinite,skew 3s infinite,glitch 1.5s both infinite;
} */


.center{
  text-align: center;
  margin-top: 150px;
  margin-bottom: 150px;
}



/* 透明度を変化させる */
.contents:hover > img{
opacity: 0.5;
}
.contents > img:hover{
opacity: 1.0;
}


/* 透明度を変化させる */
.contents:hover > div > img{
opacity: 0.5;
}
.contents > div > img:hover{
opacity: 1.0;
}

</style>
