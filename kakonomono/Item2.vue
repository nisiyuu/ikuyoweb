<template>
  <v-app>

    <div>
    <!-- 大きい画像 -->
    <div class="topitem">
    <img src= "../../public/img/sample.jpg" class="topimg">
  </div>
  <!-- 細かい画像 -->
  <div id="containeritem">
    <div class="item">
    <img src= "../../public/img/sample.jpg" class="image-resize">
  </div>
  <div class="item">
  <img src= "../../public/img/sample.jpg" class="image-resize">
</div>
  <div class="item">
  <img src= "../../public/img/sample.jpg" class="image-resize">
</div>
<div class="item">
<img src= "../../public/img/sample.jpg" class="image-resize">
</div>
</div>
</div>

<v-container style="padding:50px">
<v-layout justify-center style="padding:50px">
<div>{{product.name}}</div>
</v-layout>

<v-layout justify-center style="padding:20px">
  sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss<br>
  sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss<br>
  sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss<br>
  sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss<br>
  sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss<br>
  sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss<br>
</v-layout>


<v-layout justify-center>
<div>{{product.price}}</div>
</v-layout>
</v-container>



<!-- //セレクトボックス -->
<v-container fluid>
    <v-layout row wrap align-center>
      <v-flex xs12 sm6>
        <v-subheader v-text="'Size'"></v-subheader>
      </v-flex>


      <!-- サイズを決める -->
      <v-flex xs12 sm6>
        <v-select
          v-model="product.size"
          :items="sizes"
          :menu-props="{ maxHeight: '400' }"
          label="Select"
          persistent-hint
        ></v-select>
      </v-flex>

      <v-flex xs12 sm6>
        <v-subheader v-text="'color'"></v-subheader>
      </v-flex>


<!-- 色を選択 -->
      <v-flex xs12 sm6>
        <v-select
          v-model="product.color"
          :items="colors"
          label="Select"
          chips
          persistent-hint
        ></v-select>
      </v-flex>

<!-- カートに入れる -->
      <v-btn block color="secondary" @click="submit">
      ADD TO CART
      </v-btn>

    </v-layout>
  </v-container>
</v-app>

</template>


<style>
/* 細かい画像 */
#containeritem{
  display: grid;
   grid-template-columns: repeat(4, 1fr);
   grid-template-rows:repeat(1, 1fr);
   grid-gap: 1em;
   /* text-align: center; */
}
.cell1{
  margin-top: 70px;
  /* background-color: tomato; */
  font-size: 30px;
  font-weight: 800;
}
.cell2{
  font-size: 20px;
  /* background-color: blue; */
}
.cell3{
  /* background-color: yellow; */
}
.cell4{
  /* background-color: pink; */
}

.selectbox{
  width: auto;
  height: auto;
}


.cell5{
  background-color: orange;
}

/* フォーム */
/* .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
} */

.btn{
  border-radius: 5px;
  background-color:gray;
  color: white;
  margin-top: 20px;
  width: 300px;
  height: 50px;
  text-align: center;
}

select {
  /* styling */
    width: 30%;

    background-color: white;
    border: thin solid grey;
    border-radius: 4px;
    display: inline-block;
    font: inherit;
    line-height: 1.5em;
    padding: 0.5em 3.5em 0.5em 1em;

    /* reset */

    margin-left:1em;
    margin-top:1em;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
}

select.classic {
  background-image:
    linear-gradient(45deg, transparent 50%, black 50%),
    linear-gradient(135deg, black 50%, transparent 50%),
    linear-gradient(to right, grey, grey);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    100% 0;
  background-size:
    5px 5px,
    5px 5px,
    2.5em 2.5em;
  background-repeat: no-repeat;
}

.itemform{
  margin-left: 1em;
}

.topitem{
  text-align: center;
}

.topimg{
  width: 70%;
  height:30%;
}

.item{
  width: 100%;
  /* text-align: center; */
}


.image-resize{
  max-width: 100%;
  height: auto;
}



</style>


<script>
import { mapActions } from 'vuex'


export default {
  data () {
    return {
      sizes: ['S', 'M', 'L'],
      colors:['紺', '黒'],
      product:{ name: 'hoodie', price: '5000' },
        // { text: 'サイズ', value: 'price' },//productに値を入れる　これをaddtoCartの第二引数で受け取るそしてcartitemに渡る
    }
},

  methods: {
    submit () {
      //googleログイン
      this.$store.dispatch('login');

      //cartへ商品を送り遷移
      this.$store.dispatch('addtoCart',this.product);
      // this.addtoCart(this.product)//
      this.$router.push({ name: 'shop_item_cart' })//カートへページ遷移
      this.product = []
    },
    // ...mapActions(['addtoCart'])//
    // ...mapActions(['login'])
  }
}
</script>
