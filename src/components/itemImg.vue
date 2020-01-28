<template>
      <v-col style="text-align:center" class="mt-10 mb-8">
        <img :src="src" @load="load"
        class="img-size"
        >
      </v-col>
</template>

<script>
export default {
  props:{
    src:''
  },
  methods:{
    load(){
      this.$emit('loaded')
    }
  }
}
</script>

<style scoped>
@media screen and (min-width:1024px) {
  .img-size{
  width:170%;
  height:auto;
  }
}

@media screen and (min-width:780px) and (max-width:1024px) {
  .img-size{
  width:130%;
  height:auto;
  }
}

@media screen and (min-width:480px) and (max-width:780px) {
  .img-size{
  width:100%;
  height:auto;
  }
}

@media screen and (max-width:480px) {
  .img-size{
  width:70%;
  height:auto;
  }
}
</style>
