<template>
  <v-container text-xs-center justify-center >
      <v-data-table :headers='headers' :items='cartItems'>
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.size }}</td>
          <td class="text-xs-left">{{ props.item.color }}</td>
          <td class="text-xs-left">{{ props.item.amount}}</td>
          <td class="text-xs-left">{{ props.item.price}}</td>
          <td class="text-xs-left">{{ props.item.price}}</td>
          <td class="text-xs-left">{{ props.item.price}}</td>
          <span>
                <v-icon small class="mr-2" @click="deleteConfirm(props.item.id)">delete</v-icon>
          </span>
        </template>
      </v-data-table>


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
    deleteConfirm (id) {
      if (confirm('削除してよろしいですか？')) {
        this.deleteProducts({ id })
      }
    },
    ...mapActions(['deleteProducts'])
  },
  computed:{
    cartItems(){
      return this.$store.getters['cart/userCart'];
    }
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
