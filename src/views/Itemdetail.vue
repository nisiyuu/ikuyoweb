<template>
<div>
  <v-container style="color:black;">
    <v-row>
      <v-col cols=12 lg=12 md=12 sm=12 class="mt-10 pa-0">
        <v-img class="mb-12 foo"
        v-for="(sample,i) in items[0].samples"
        :key="i"
        :src="sample.sample"
        style="width:50%;height:auto;margin: 0 auto;"
        ></v-img>
      </v-col>
    </v-row>
    
    <v-row justify="center"
    v-observe-visibility="{
      callback: visibilityChanged01,
      intersection: {
        threshold: 0.1,
      }}"
    v-bind:class='{active:isVisible01}'
    class="inactive mt-10"
    >
      <v-col cols=10 lg=6 md=6 sm=6 class="mt-0 ml-0 pl-0 pb-0" style="border-left:solid 1px #B759C7;"> 
        <vue-typer class="pt-0 itemname" :text="items[0].name"></vue-typer>
        <v-col class="pt-0 itemsubject">Detail</v-col>
        <v-col class="pt-0 itemcontent">{{items[0].description}}</v-col>
        <v-col class="pt-0 itemsubject">Price</v-col>
        <v-col class="pt-0 itemcontent">{{items[0].price}}</v-col>

    <v-col class="mb-12 mt-8" style="margin:0 auto;">
      <v-select
           v-model="selected"
           item-text="text"
           item-value="value"
           :items="selectableItems"
           :menu-props="{ maxHeight: '400' }"
           label="Size & color"
           persistent-hint
           outlined
           color="#B759C7"
          >
          </v-select>
      <v-btn color="black" @click="addCart" :disabled="buttonDisabled" block>
        <div style="color:white">ADD TO CART</div>
      </v-btn>
    </v-col>
</v-col>
  </v-row>
</v-container>
</div>
</template>

<script>
import itemutil from '../mixin/Item.js'
import three from "../components/backthree.vue";
import { VueTyper } from 'vue-typer'
import { ObserveVisibility }from 'vue-observe-visibility'

export default {
  mixins:[itemutil],
  components:{
    three,
    VueTyper,
    ObserveVisibility,
  },
  props:{
    groupID:{type:String, default:'ikuyoT'},//shop.vueのなかのItemlist.vueから送られてくる
  },
  data () {
    return {
      selected: null,
        // { text: 'サイズ', value: 'price' },//productに値を入れるこれをaddtoCartの第二引数で受け取るそしてcartitemに渡る
      isVisible01: false,
    }
},//array.filterで範囲を狭くしていく、それでidを生成、さらに言えば範囲を狭くしてき、何もなくなれば在庫切れ
computed:{
  isActive(){
    if(this.items[0].type!=='01') {
      return true;
    }
    else{
      return false;
    }
  },
  userCart() {
    return this.$store.getters['cart/userCart'];
  },
  items(){
    return this.$_getItems({groupID:this.groupID});//オブジェクト渡しているkeyがgroupIDでvalueもgroupID
  },
  // sizes(){
  //   return this.items[0].items.map(item => item.size);
  //   // return Array.from(new Set(this.items[0].items.map(item => item.size)));vuetifyがないときはこっち
  // },
  // colors(){
  //   return this.items[0].items.map(item => item.color);
  //   // return Array.from(new Set(this.items[0].items.map(item => item.size)));vuetifyがないときはこっち
  // },
  selectableItems(){//在庫の有無はここにつける
    return this.items[0].items.map(item => ( { text: item.listItem, value: item.id }));
  },
  buttonDisabled() {//選択しないとaddcart押せない
    return this.selected === null;
  }
 },
methods: {
    visibilityChanged01(isVisible01, entry) {
        this.isVisible01 = isVisible01
    },


    addCart () {
      //cartへ商品を送り遷移
      const selectedItem = {
        id: this.selected,
        groupID:this.groupID,
        time: new Date()
      }
      this.$store.dispatch('cart/addtoCart',selectedItem);
      console.log('時間',selectedItem);
      this.$router.push({ name: 'cart' })//カートへページ遷移
    },
  }
}
</script>


<style scoped>
.fade-enter{
  opacity: 0;
}

.fade-leave-to{
  transform: translateX(100px)
}

.fade-enter-active{
  transition: opacity 4s;
}

.fade-leave-active {
  transition: transform 4s ease-in;
}


.inactive{
  opacity:0;
  margin-top: 30%;
  margin-bottom:10%;
}

.active{
  animation-name:fade-in;
  animation-duration:2s;
  animation-timing-function: ease-out;
  animation-delay:0s;
  animation-iteration-count:1;
  animation-direction:normal;
  animation-fill-mode: forwards;
}

@keyframes fade-in {
  0% {opacity: 0; transform: translate3d(0,-50px,0);}
  100% {opacity: 1; transform: translate3d(0,0,0);}
}


.itemname{
  width:100%;
  height:auto;
  font-size: calc(0.75rem + ((1.8vw - 4.8px) * 0.9677));
  word-wrap: break-word;
  font-weight:600;
  /* border-bottom:solid 1px #B759C7; */
}

.itemcontent{
  width:100%;
  height:auto;
  font-size: calc(0.75rem + ((1vw - 4.8px) * 0.9677));
  word-wrap: break-word;
  margin-left:9%;
  border-left:solid 1px #B759C7;
}

.itemsubject{
  width:100%;
  height:auto;
  font-size: calc(0.75rem + ((1.3vw - 4.8px) * 0.9677));
  word-wrap: break-word;
  font-weight:600;
  margin-left:5%;
  margin-top:15%;
}

.eraseLine{
  text-decoration: line-through;
  text-decoration-style:wavy;
  text-decoration-color:red;
}

</style>



