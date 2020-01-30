<template>
  <v-container fluid class="size-adjust ma-4">
    <v-row>
      <v-col cols=12 class="mt-12 mb-0" style="font-weight:900;">
        <vue-typer text="Shopping　Cart" :repeat='0'></vue-typer>
      </v-col>
      <v-col cols=12 v-show="totalPrice!=0">
      カートの中身をご確認の上、NEXTボタンでお支払いへお進みください。
      </v-col>
    </v-row>

    <!-- カートに入れた商品一覧 -->
    <v-row>
    <v-col cols="5" class="item-info">item</v-col>
    <v-col cols="3" class="item-info">name</v-col>
    <v-col cols="2" class="item-info">price/yen</v-col>
    <v-col cols="2" class="item-info"></v-col>
    </v-row>

      <v-row align="center" v-for="(item,index) in items" :key="index" class="basesize">
        <v-col cols=3 class="item-info-prop"><v-img :src="getCartItem(item,item[0].itemid).image" width="50%" style="margin:0 auto"></v-img></v-col>
        <v-col cols=2 class="item-info-prop">{{getCartItem(item,item[0].itemid).listItem}}</v-col>
        <v-col cols=3 class="item-info-prop">{{item[0].name}}</v-col>
        <v-col cols=2 class="item-info-prop">{{item[0].price}}</v-col>
        <v-col cols=2 class="item-info-prop"><v-btn color="black" @click="deleteConfirm(item[0].itemid)" style="color:white" x-small>DEL</v-btn></v-col>
    </v-row>
    
    <v-row justify="end" class="mt-10">
      <!-- 合計金額の表示 -->
      <v-col cols=7 lg=3 md=3 sm=4 v-show="totalPrice!=0" style="border-bottom:solid 1px #B759C7;">
        <span style="font-size:0.5rem;">TOTALPRICE　</span>
        <span style="font-size:0.9rem;">¥{{totalPrice + 500}} (tax in)</span>
      </v-col>
    </v-row>

    <v-row justify="end">
      <v-col cols=7 lg=3 md=3 sm=4 v-show="totalPrice!=0" style="font-size:0.4rem;">※送料は一律¥500頂いております</v-col>
      <!-- 合計金額が0の時＝商品がない時の表示 -->
      <v-col v-show="totalPrice==0">Cart　is　empty</v-col>
    </v-row>
    
    <v-row class="mt-6" justify="end"> 
      <v-col cols=7 lg=3 md=3 sm=4 align="end">
        <v-btn color="black" :to="{name: 'stripe'}" :disabled="buttonDisabled" height="30" width="100%">
          <div style="color:white">NEXT</div>
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="" justify="end"> 
      <v-col cols=7 lg=3 md=3 sm=4 align="end"> 
        <v-btn color="rgba(0,0,0,0.12)" :to="{name: 'shop'}" height="30" width="100%">
          <div style="color:white">CONTINUE SHOPPING</div>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { VueTyper } from 'vue-typer'
import itemutil from '../mixin/Item.js'
  
  export default {
    mixins:[itemutil],
    components:{
      VueTyper
    },
    data(){
      return{
        cartItems: null,
        items:[],
      }
    },
    created() {
      this.cartItems = this.$store.getters['cart/userCart'];
      this.cartItems.forEach(async item => {
        const detail = await this.getItemDetail(item.groupID);
        detail[0].itemid = item.id;
        this.items.push(detail);
      })
    },
    methods: {
      getCartItem(item,itemid) {
        return item[0].items.find(array => array.id === itemid); 
      },
      async getItemDetail(groupID) {
        return await this.$store.dispatch('item/getItemsFromGroup',groupID)
      },
      deleteConfirm(ida){
        if (confirm('削除してよろしいですか？')) {
         this.deleteItem(ida)
        }
      },
      deleteItem(id){
        this.$store.dispatch('cart/deleteItem',id);
        this.cartItems = this.$store.getters['cart/userCart'];
        if(this.cartItems.length == 0){
          this.items = [];//配列自体の初期化だから$setとか$deleteはいらない
        }
        // cartストアから削除後のカートを呼び出す
        else{
          this.items = [];//一旦空にする
          this.cartItems.forEach(async item => {
            const detail = await this.getItemDetail(item.groupID);
            detail[0].itemid = item.id;
            this.items.push(detail);
          })
        }
      }
    },
    computed:{
      totalPrice() {
        let total = 0;
        if(this.cartItems.length == 0){
          return total;
     　 }else{
          this.items.forEach(item => {
            total += Number(item[0].price);
          });
        return total;
        }
      },
      buttonDisabled() {//商品がないと押せない
        return this.totalPrice === 0;
      }
    },
　}
</script>

<style scoped>
.item-info{
  background-color: lightgrey;
  text-align:center;
  font-size:0.7rem;
}

.item-info-prop{
  font-size:0.4rem;
}


.size-adjust{
  width:auto;
  height:auto;
  font-size:62.5%;
}

.basesize{
  font-size: calc(0.75rem + ((1vw - 4.8px) * 0.9677));
  text-align:center
}
</style>
