<template>
  <div>
    <loading v-show="!imgLoaded"/>
    <div v-show="imgLoaded" class="margin-size">
      <item-img
      v-for="(img,i) in imgs"
      :key="i"
      :src="img"
      @loaded="loaded"
      />
    </div>
  </div>
</template>

<script>
import itemImg from '../components/itemImg.vue'
import loading from '../views/loading.vue'

export default {
  components:{
    itemImg,
    loading
  },
  props:{
    imgs: { Type: Array, default: [] },
  },
  data(){
    return{
      counter:0
    }
  },
  computed:{
    imgLoaded(){
      return this.counter === this.imgs.length;
    }
  },
  methods:{
    loaded(){
      this.counter += 1;
    }
  }
}
</script>

<style scoped>
@media screen and (min-width:960px) {
  .margin-size{
    margin-left:40%;
    margin-top:10%;
  }
}

@media screen and ( min-width:600px) and (max-width:960px){
  .margin-size{
    margin-top:10%;
  }
}


@media screen and (max-width:600px) {
  .margin-size{
    margin-top:20%;
  }
}

</style>
