<template>
  <v-app>
    <div class="itemdetail">
      <v-carousel :show-arrows="false"
      hide-delimiters
      interval="5000"
      >
        <v-carousel-item
        v-for="(item,i) in items[0].items"
        :key="i"
        :src="item.image"
        ></v-carousel-item>
        </v-carousel>
    
    </div>

<v-container style="padding:50px">
<v-layout justify-center>
<div class="font-weight-bold">{{items[0].name}}</div>
</v-layout>

<v-layout justify-center style="margin:50px;">
  <div>{{items[0].description}}</div>
</v-layout>


<v-layout justify-center>
<div>{{items[0].price}} yen</div>
</v-layout>
</v-container>

<!-- //セレクトボックス -->
<v-container fluid>
    <v-layout row wrap align-center>
      <v-flex xs12 sm6>
        <v-subheader v-text="'Size&color'"></v-subheader>
      </v-flex>


      <!-- アイテムを決める -->
      <v-flex xs12 sm6>
        <v-select
          v-model="selected"
          item-text="text"
          item-value="value"
          :items="selectableItems"
          :menu-props="{ maxHeight: '400' }"
          label=""
          persistent-hint
          color="red"
        >
        </v-select>
      </v-flex>

      <!-- カートに入れる -->
      <v-flex xs12 sm12>
      <v-btn block color="red" @click="addCart" :disabled="buttonDisabled">
      <div style="color:white">ADD TO CART</div>
      </v-btn>
      </v-flex>
    </v-layout>
</v-container>
</v-app>

</template>

<script>
import itemutil from '../mixin/Item.js'

export default {
  mixins:[itemutil],
  props:{
    groupID:{type:String, default:'ikuyoT'},//shop.vueのなかのItemlist.vueから送られてくる
  },
  data () {
    return {
      selected: null,
        // { text: 'サイズ', value: 'price' },//productに値を入れる　これをaddtoCartの第二引数で受け取るそしてcartitemに渡る
    }
},//array.filterで範囲を狭くしていく、それでidを生成、さらに言えば範囲を狭くしてき、何もなくなれば在庫切れ
computed:{
  userCart() {
    return this.$store.getters['cart/userCart'];
  },
  items(){
    return this.$_getItems({groupID:this.groupID});//どうなってる？
  },
  sizes(){
    return this.items[0].items.map(item => item.size);
    // return Array.from(new Set(this.items[0].items.map(item => item.size)));vuetifyがないときはこっち
  },
  colors(){
    return this.items[0].items.map(item => item.color);
    // return Array.from(new Set(this.items[0].items.map(item => item.size)));vuetifyがないときはこっち
  },
  selectableItems(){//在庫の有無はここにつける
    return this.items[0].items.map(item => ( { text: item.listItem, value: item.id }));
  },
  buttonDisabled() {//選択しないとaddcart押せない
    return this.selected === null;
  }
 },
methods: {
    addCart () {
      //googleログイン 一旦保留 10/08
      // this.$store.dispatch('login');

      //cartへ商品を送り遷移
      const selectedItem = {
        id: this.selected,
        groupID:this.groupID,
      }
      this.$store.dispatch('cart/addtoCart',selectedItem);
      // this.addtoCart(this.product)//
      this.$router.push({ name: 'cart' })//カートへページ遷移
      // this.id = []
    },
    
    // ...mapActions(['addtoCart'])//
    // ...mapActions(['login'])
  }
}
</script>


<style>
.yohaku{
  margin-top: 50px;
}

.itemdetail{
  /* margin-top:80px; */
}

</style>