<template>
  <div>
    <v-row justify="center">
      <v-col cols=12 lg=12 md=12 sm=12 style="text-align:center;color:black;font-weight:900;font-size: calc(0.75rem + ((2vw - 4.8px) * 0.9677));" class="mt-12 mb-6">
        <vue-typer text="Your Shopping　Cart" :repeat='0'></vue-typer>
      </v-col>
    </v-row>

    <!-- カートに入れた商品一覧 -->
    <v-row  align="center" justify="center" v-for="(item,index) in items" :key="index" class="basesize">
      <v-col cols=7 lg=7 md=7 sm=7><v-img :src="getCartItem(item,item[0].itemid).image" width="50%" style="margin:0 auto"></v-img></v-col>
      <v-col cols=5 lg=5 md=5 sm=5 class="mt-2">
      <v-col>{{item[0].name}}</v-col>
      <v-col>{{item[0].price}} yen</v-col>
      <v-col>{{getCartItem(item,item[0].itemid).listItem}}</v-col>
      <v-col><v-btn color="black" @click="deleteConfirm(item[0].itemid)" class="ml-0" height="4vh" style="font-size:1vw;color:white">DELETE</v-btn></v-col>
      </v-col>
    </v-row>
    
    <v-col class="mt-12 mb-10" cols=12 lg=12 md=12 sm=12 align="center">
      <!-- 合計金額の表示 -->
      <div v-show="totalPrice!=0" style="font-weight:700;font-size: calc(0.75rem + ((2vw - 4.8px) * 0.9677));">TOTALPRICE　 {{totalPrice + 1000}} yen (tax in)</div>
      <div v-show="totalPrice!=0" style="font-weight:300;font-size: calc(0.75rem + ((0.5vw - 4.8px) * 0.9677));">※送料は一律1000yen頂いております</div>
      <!-- 合計金額が0の時＝商品がない時の表示 -->
      <div v-show="totalPrice==0">Cart　is　empty</div>
    </v-col>
    
    <v-row class="mb-6 mt-6" justify="center"> 
      <v-col cols=12 lg=12 md=12 sm=12 align="center">
        <v-btn color="black" :to="{name: 'stripe'}" :disabled="buttonDisabled" height="30" width="70%">
          <div style="color:white">NEXT</div>
        </v-btn>
      </v-col>
      <v-col cols=12 lg=12 md=12 sm=12 align="center"> 
        <v-btn color="rgba(0,0,0,0.12)" :to="{name: 'shop'}" height="30" width="70%">
          <div style="color:white">CONTINUE SHOPPING</div>
        </v-btn>
      </v-col>
    </v-row>
  </div>
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
.basesize{
  font-size: calc(0.75rem + ((1vw - 4.8px) * 0.9677));
}
</style>
