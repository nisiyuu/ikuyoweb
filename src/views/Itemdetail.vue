<template>
<div class="z">
  <div class="z2">
    <v-container>
    <v-row justify="space-around" style="color:#954399">
    <v-col cols=12 lg=6 md=6 sm=6 class="mt-12 ml-0 mb-12">
      <v-col cols=12 lg=12 md=12 sm=12 class="ma-0 pa-0">
      <v-carousel
      hide-delimiters
      :show-arrows="false"
      cycle
      interval="3000"
      progress
      progress-color="#954399"
      height="auto"
      style="width:80%;height:auto;margin: 0 auto;"
      >
      <v-carousel-item
      v-for="(item,i) in items[0].items"
      :key="i"
      :src="item.image"
      style="width:100%;height:auto;text-align:center"
      >
      </v-carousel-item>
       </v-carousel>
      </v-col>
      <v-col cols=12 lg=12 md=12 sm=12 class="mt-10 pa-0">
      <v-img class="mb-12 foo"
      v-for="(sample,i) in items[0].samples"
      :key="i"
      :src="sample.sample"
      style="width:50%;height:auto;margin: 0 auto;"
      ></v-img>
      </v-col>

    </v-col>

<v-col cols=10 lg=6 md=6 sm=6 class="mt-10 ml-0 pl-0"> 

    <v-col class="mb-8 mt-2">
        <vue-typer :repeat='0' class="pt-0 itemsubject" :text=items[0].name></vue-typer>      
    </v-col>
    <v-col class="">
      <vue-typer :repeat='1' class="pt-0 itemsubject" text="detail"></vue-typer>
    </v-col>
    <v-col class="mb-12">
        <vue-typer :repeat='1' class="pt-0 itemcontent" :text=items[0].description></vue-typer>      
    </v-col>
    
    <v-col class="">
      <vue-typer :repeat='1' class="pt-0 itemsubject" text="price"></vue-typer>
    </v-col>

    <v-col class="mb-12">
        <vue-typer :repeat='1' class="pt-0 itemcontent" :text=items[0].price></vue-typer>      
    </v-col>


    <!-- <v-col class="mb-1 itemsizecolor" v-text="'Size&color'" :class="{ eraseLine: isActive}">
    </v-col> -->
        
      <!-- アイテムを決める -->
    <v-col class="ma-0 pa-0">
      <v-select
      v-model="selected"
      item-text="text"
      item-value="value"
      :item-color="'#ffffe0'"
      :items="selectableItems"
      :menu-props="{ maxHeight: '400' }"
      label="Size & color"
      persistent-hint
      outlined
      color="#954399"
      >
      <template v-slot:selection="{ item, index }">
        <span style="color: #954399;font-size:50%; font-weight:900">{{ item.text }}</span>
      </template>
      </v-select>
    </v-col>

    <!-- カートに入れる -->
    <v-col class="mb-12" style="margin:0 auto;">
      <v-btn color="#954399" @click="addCart" :disabled="buttonDisabled" block>
        <div style="color:white">ADD TO CART</div>
      </v-btn>
    </v-col>
</v-col>

  </v-row>
</v-container>
  </div>
  <!-- <three class="z1"></three> -->
</div>
</template>

<script>
import itemutil from '../mixin/Item.js'
import three from "../components/backthree.vue";
import { VueTyper } from 'vue-typer'


export default {
  mixins:[itemutil],
  components:{
    three,
    VueTyper,
  },
  props:{
    groupID:{type:String, default:'ikuyoT'},//shop.vueのなかのItemlist.vueから送られてくる
  },
  data () {
    return {
      selected: null,
        // { text: 'サイズ', value: 'price' },//productに値を入れるこれをaddtoCartの第二引数で受け取るそしてcartitemに渡る
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


<style>
.v-list-item__title {
  color: #954399;
}

.itemmainsubject{
  width:100%;
  height:auto;
  /* font-size:5vw; */
  font-size:180%;
  word-wrap: break-word;
  padding:0 0;
  font-weight:900;
}

/* スクロールふわり */
.itemcontent{
  width:100%;
  height:auto;
  /* font-size:3vw; */
  font-size:100%;
  word-wrap: break-word;
  padding: 0 0;
  font-weight:600;
  font-family: 'Courier New', Courier, monospace;
}

.itemsubject{
  width:100%;
  height:auto;
  /* font-size:2vw; */
  font-size:120%;
  word-wrap: break-word;
  border-bottom:solid 3px #954399;
  padding:0 0;
  font-weight:900;
}

.itemsizecolor{
  width:100%;
  height:auto;
  font-size:1.5vw;
  word-wrap: break-word;
  padding: 0 0;
  font-weight:900;
}


/* .foo.delighter {
  transition: all 0.5s ease-out;
  opacity: 0;
  width:auto;
  height:auto;
}
.foo.delighter.started {
  opacity: 1;
} */
/* .foo.delighter.started.ended {
  
} */


.eraseLine{
  text-decoration: line-through;
  text-decoration-style:wavy;
  text-decoration-color:red;
}

.menu2{
    color:#954399;
    border:double #954399;
    font-size: 120%;
    font-weight:900;
    margin:2em 2em;
    position: relative;
    padding: 0.5em 1.5em;
    border:double 5px #954399;
}
.menu2:before, .menu2:after{
    content: '';
    position: absolute;
    top: -10px;
    width: 2px;
    height: -webkit-calc(100% + 20px);
    height: calc(100% + 20px);
    background-color: #954399;
}
.menu2:before {left: 10px;}
.menu2:after {right: 10px;}
.menu2 span {
    margin: 0; 
    padding: 0;
}

.toptextstyle{
  padding:10px;
  color:#954399;
  font-weight: bold;
  font-size: 100%; 
}

.textstyle{
  padding:50px;
  color:#954399;
  font-weight: bold;
  font-size: 100%; 
}


/* memo
<v-carousel
      hide-delimiters
      :show-arrows="false"
      cycle
      interval="4000"
      progress
      progress-color="#954399"
      height="650"
      >
      <v-carousel-item
      v-for="(item,i) in items[0].items"
      :key="i"
      :src="item.image"
      ></v-carousel-item>
      </v-carousel> */
</style>



