<template>
  <div>
    <loading v-show="!imgLoaded"/>
    <div v-show="imgLoaded">
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

</style>
