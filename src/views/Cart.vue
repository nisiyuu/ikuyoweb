<template>
  <v-container text-xs-center justify-center >
  <v-flex text-center style="margin-top:50px;">
  <v-card v-for="(item,index) in cartItems" :key="index"
  class="mx-auto" 
  max-width="400"
  style="margin-top:50px;"
  outlined>
    <v-img
      class="white--text align-end"
      height="200px"
      :src="getItemDetails(item).image"
    >
    </v-img>

    <v-card-text class="text--primary">
      <div>{{getItemGroup(item).name}}</div>
      <div>{{getItemGroup(item).price}} yen</div>
      <div>{{getItemDetails(item).listItem}}</div>
    </v-card-text>

    <v-card-actions>
      <v-flex text-center>
      <v-btn color="gray" text @click="deleteConfirm(item.id)">Delete</v-btn>
      </v-flex>
    </v-card-actions>
  </v-card>
</v-flex>

<!-- <div v-for="(item,index) in cartItems" :key="index">
  <div>{{totalPrice(item)}} yen</div>
</div> -->


      <v-flex xs12 mt-5>
        <v-btn block color="gray" :to="{name: 'shop'}">BACK</v-btn>
      </v-flex>
      <v-flex xs12 mt-5>
        <v-btn block color="red" :to="{name: 'stripe'}">NEXT</v-btn>
            <!-- <v-btn color='info' @click="login">支払いへ</v-btn> -->
      </v-flex>


    <!-- </v-layout> -->
  </v-container>
</template>



<script>
  import { mapActions } from 'vuex'
  // import firebase from 'firebase'
  // import Selectbox from '../components/Selectbox.vue'

  export default {
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
      console.log('args ===>', groupID, id );
      const group = this.getItemGroup({groupID});//なんで{}必要？
      console.log('group', group);
      console.log('findddd',group.items.find(item => item.id === id));
      return group.items.find(item => item.id === id);
      // return this.$store.getters['item/allItems']({groupID}).find(group => group.items)
    },
    // totalAmount({groupID}){
    //   let total;
    //   const price = this.getItemGroup({groupID}).price;
    //     for(let i=0;i<this.getItemGroup({groupID}).length;i++){
    //       total += price;
    //     }
    //     return total;
    //   },
      // totalPrice({groupID}){
      //    const group = this.getItemGroup({groupID});
      //     return group.reduce(function(sum, item) {
      //       return sum + (item.price);
      //     }, 0)
      //   },

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
      return total;
    },
  },
  created () {
    this.cartitem = this.$store.state.cartitem
    console.log(this.cartitem);
  },
  data () {
    return {
      headers: [
        { text: '商品名', value: 'name' },
        { text: 'サイズ', value: 'size' },
        { text: '色', value: 'color' },
        { text: '数', value: 'amount' },
        { text: '価格', value: 'price' },
      ],
      cartitem: [],
    }
  },
}
  </script>
