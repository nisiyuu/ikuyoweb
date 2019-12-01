<template>
<div> 
  <div class="image">
    <v-card elevation="0">
      <v-img
      :src=itemData.image
      class="align-end headline"
      height="100%"
      width="100%"
      @click="select"
      >
      </v-img>
    </v-card>
  </div>

</div>
</template>

<style scoped>

.image{
  /* text-align: center; */
  margin-bottom: 20%;
}

</style>

<script>
// import VueObserveVisibility from 'vue-observe-visibility'//スクロールで画像浮き上がるプラグイン

export default {
  props:{//Itemlist.vueから受け取るpropsを定義
    itemData:{type: Object, required:true},
  },
  methods: {
    select() {
      this.$emit('select', this.itemData.groupID);//groupIdにしないと見づらい＝＞shop.vueのitemタグで:group-i-d=item.gropuIDと書かなくてはいけなくなる
      //イベントを発行する側 shop.vueで登録したカスタムイベントのselectを発火
    },
  }
}

// データの流れはshop.vue=>NewItem.vueのように単方向が良い。
</script>
