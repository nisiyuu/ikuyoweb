<template>
  <div style="text-align:center">
    <img :src="src" @load="load"
    class="img-size"
    >
  </div>
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
@media screen and (min-width:960px)  {
  .img-size{
  width:150%;
  height:auto;
  margin-bottom:10%;
  }
}

@media screen and ( min-width:600px) and (max-width:959px){
 .img-size{
  width:55%;
  height:auto;
  margin-bottom:15%;
  }
}

@media screen and (max-width:599px){
  .img-size{
  width:70%;
  height:auto;
  margin-bottom:15%;
  }
}
</style>
