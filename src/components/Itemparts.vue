<template>
  <div> 
    <div>
      <v-img
      :src=itemData.samplemain
      class="image ma-12"
      height="auto"
      width="70%"
      @click="select"
      >
      </v-img>
    </div>
  </div>
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
.image{
  margin:0 0 0 auto;
}
</style>

// データの流れはshop.vue=>Itemlist.vueのように単方向が良い。