<template>
<div class="z">
  <div class="z2">

  <v-row justify="center">
    <v-col cols=12 lg=12 md=12 sm=12 style="text-align:center;color:#954399;font-weight:900;font-size:20px;" class="ma-12">
    <vue-typer text="Shopping　Cart" :repeat='0'></vue-typer>
    </v-col>
    <v-timeline style="width:85%;height:85%;">
      <v-timeline-item :fill-dot="true" :small="true" color="#954399"
      v-for="(item,index) in cartItems" :key="index"
      >
        <span slot="opposite" style="color:#954399;">{{item.time}}</span>
        <v-card outlined
        max-width="400"
        elevation="0"
        color="#954399"
        >
    <v-img class="white--text align-end" height="200px" :src="getItemDetails(item).image">
    </v-img>
    <v-card-text style="color:white">
      <div>{{getItemGroup(item).name}}</div>
      <div>{{getItemGroup(item).price}} yen</div>
      <div>{{getItemDetails(item).listItem}}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="rgba(0,0,0,0.12)" text @click="deleteConfirm(item.id)"><div style="color:white;">DELETE</div></v-btn>
    </v-card-actions>
  </v-card>
      </v-timeline-item>
  </v-timeline>
  </v-row>


  <v-col style="font-weight:900" class="mt-10 mb-10" cols=12 lg=12 md=12 sm=12 align="center">
    <div style="color:#954399" v-show="totalPrice!=0">TOTALPRICE　 {{totalPrice + 1000}} yen (tax in)</div>
    <div style="color:#954399" v-show="totalPrice!=0">※送料は一律1000yen頂いております</div>
    <div style="color:#954399" v-show="totalPrice==0">Cart　is　empty</div>
  </v-col>

<v-row class="mb-12"> 
<v-col cols=12 lg=12 md=12 sm=12 align="center">
  <v-btn color="#954399" :to="{name: 'stripe'}" :disabled="buttonDisabled"><div style="color:white">NEXT</div></v-btn>
</v-col>
<v-col cols=12 lg=12 md=12 sm=12 align="center" class="mb-12"> 
  <v-btn color="rgba(0,0,0,0.12)" :to="{name: 'shop'}"><div style="color:white">CONTINUE SHOPPING</div></v-btn>
</v-col>
</v-row>

</div>
<three class="z1"></three>
</div>
</template>



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
