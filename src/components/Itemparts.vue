<template>
  <v-col style="text-align:center" class="mt-8 mb-0 ml-6">
    <img
      :src=itemData.samplemain
      class="img-size ma-2"
      @click="select"
    >
  </v-col>
</template>

<script>
export default {
  props:{//Itemlist.vueから受け取るpropsを定義
    itemData:{type: Object, required:true},
  },
  methods: {
    select() {
      this.$emit('select', this.itemData.groupID);
      //イベントを発行する側 Itemlist.vueで登録したカスタムイベントのselectを発火
    },
  }
}
</script>

<style scoped>
@media screen and (min-width:1024px) {
  .img-size{
  width:60%;
  height:auto;
  }
}

@media screen and (min-width:780px) and (max-width:1024px) {
  .img-size{
  width:50%;
  height:auto;
  }
}

@media screen and (min-width:480px) and (max-width:780px) {
  .img-size{
  width:70%;
  height:auto;
  }
}

@media screen and (max-width:480px) {
  .img-size{
  width:100%;
  height:auto;
  }
}
</style>

// データの流れはshop.vue=>Itemlist.vueのように単方向が良い。