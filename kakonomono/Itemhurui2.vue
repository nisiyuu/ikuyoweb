<template>
  <body>
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

<!-- 購入フォーム -->
<form class="itemform">
    <div class="cell1">Tshirt</div>
    <div class="cell2">$10000</div>
    <div class="cell3">※こちらの価格には税込みです。<br>※1回のご注文ごとに送料600円がかかります。</div>

    <div>
    <label class="label">種類</label>
    <select name="サイズ" class="classic">
    <option>白</option>
    <option>グレー</option>
    <option>黒</option>
 </select>
  </div>



  <div>
    <label class="label">斉須</label>
    <select name="サイズ" class="classic">
    <option>S</option>
    <option>M</option>
    <option>L</option>
 </select>
  </div>

  <div>
    <label class="label">数量</label>
    <select name="数量" class="classic">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
  </select>
  </div>
  <div class="topitem">
  <router-link v-bind:to="{ name : 'shop_item_cart'}" class="btn"
  :id="product.id"
  :name="product.name"
  :price="product.price"
  >
  </router-link>
  <!-- <button @click="submit" type="button" class="btn">ADD TO  SHOPPING CART</button> -->
</div>
<!-- <div v-if="show_result">{{result_message}}</div>
<div id="card-element">
    </div> -->
</form>


</body>
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
  import Stripe from '../components/Stripe.vue'
  import Cart from '../components/Cart.vue'


  export default {
    components: {
      Stripe,
      Cart,
    }
  }

  </script>
