<template>
<div class="z">
  <div class="z2">

  <v-row justify="center">
    <v-col cols=12 lg=12 md=12 sm=12 style="text-align:center;color:black;font-weight:900;font-size: calc(0.75rem + ((2vw - 4.8px) * 0.9677));" class="ma-12">
    <vue-typer text="Your Shopping　Cart" :repeat='0'></vue-typer>
    </v-col>
  </v-row>
        
    <v-row  align="center" justify="center" v-for="(item,index) in cartItems" :key="index" class="basesize">
      <v-col cols=7 lg=7 md=7 sm=7><v-img :src="getItemGroup(item).samplemain" width="50%" style="margin:0 auto"></v-img></v-col>
      <v-col cols=5 lg=5 md=5 sm=5 class="mt-3">
      <v-col>{{getItemGroup(item).name}}</v-col>
      <v-col>{{getItemGroup(item).price}} yen</v-col>
      <v-col>{{getItemDetails(item).listItem}}</v-col>
      <v-col><v-btn color="black" @click="deleteConfirm(item.id)" class="ml-0" width="0.1vw" height="auto" style="font-size:0.1vw;color:white">DELETE</v-btn></v-col>
      </v-col>
    </v-row>


  <v-col class="mt-12 mb-10" cols=12 lg=12 md=12 sm=12 align="center">
    <div v-show="totalPrice!=0" style="font-weight:700;font-size: calc(0.75rem + ((2vw - 4.8px) * 0.9677));">TOTALPRICE　 {{totalPrice + 1000}} yen (tax in)</div>
    <div v-show="totalPrice!=0" style="font-weight:300;font-size: calc(0.75rem + ((0.5vw - 4.8px) * 0.9677));">※送料は一律1000yen頂いております</div>
    <div v-show="totalPrice==0">Cart　is　empty</div>
  </v-col>

<v-row class="mb-12"> 
<v-col cols=12 lg=12 md=12 sm=12 align="center">
  <v-btn color="black" :to="{name: 'stripe'}" :disabled="buttonDisabled" width="50%"><div style="color:white">NEXT</div></v-btn>
</v-col>
<v-col cols=12 lg=12 md=12 sm=12 align="center" class="mb-12"> 
  <v-btn color="rgba(0,0,0,0.12)" :to="{name: 'shop'}" width="50%"><div style="color:white">CONTINUE SHOPPING</div></v-btn>
</v-col>
</v-row>
</div>
</div>
</template>

<style scoped>
.basesize{
  font-size: calc(0.75rem + ((1vw - 4.8px) * 0.9677));
}

</style>



<script>
import { mapActions } from 'vuex'
import three from "../components/backthree.vue";
import { VueTyper } from 'vue-typer'



  export default {
    components:{
      three,
      VueTyper
    },
    methods: {
    deleteConfirm(id){
      if (confirm('削除してよろしいですか？')) {
        this.deleteItem(id)
      }
    },
    deleteItem(id){
      this.$store.dispatch('cart/deleteItem',id);
    },
    getItemGroup({groupID}) {
      return this.$store.getters['item/allItems']({groupID})[0];
    },
    getItemDetails({ groupID, id }){
      // console.log('args ===>', groupID, id );
      const group = this.getItemGroup({groupID});//なんで{}必要？=>分割代入
      // console.log('group', group);
      // console.log('findddd',group.items.find(item => item.id === id));
      return group.items.find(item => item.id === id);
    },
    ...mapActions(['deleteProducts'])
  },
  computed:{
    cartItems(){
      console.log(this.$store.getters['cart/userCart']);
      return this.$store.getters['cart/userCart'];
    },
    totalPrice() {
      let total = 0;
      this.$store.getters['cart/userCart'].forEach(item => {
        total += Number(this.getItemGroup(item).price);
      });
       console.log(total);
      return total;
    },
    buttonDisabled() {//選択しないと押せない
    return this.totalPrice === 0;
  }
  },
}
  </script>
