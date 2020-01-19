<template>
  <div>
    <!-- 本画面 -->
    <!-- 在庫ないとき -->
    <div v-show="items[0].stock === false" class="outofstock">
      <p>sorry, out of stock</p>
    </div>
    <!-- 在庫あるとき -->
    <v-container class="ma-0 pa-0" v-show="items[0].stock === true">
      <detail-imgs
      :imgs="detailImgs"
      />
      <v-row 
      justify="center"
      v-observe-visibility="{
      callback: visibilityChanged01,
      intersection: {
        threshold: 0.1,
      }}"
      v-bind:class='{active:isVisible01}'
      class="inactive mt-10"
      >
        <v-col cols=10 lg=6 md=6 sm=6 class="mt-0 ml-0 pl-0 pb-0 mb-0" style="border-left:solid 1px #B759C7;"> 
          <vue-typer class="pt-0 itemname" :text="items[0].name"></vue-typer>
          <v-col class="pt-0 itemsubject">Price</v-col>
          <v-col class="pt-0 itemcontent">{{items[0].price}}</v-col>
          <v-col class="pt-0 itemsubject">About</v-col>
          <v-col class="pt-0 itemcontent">{{items[0].description}}</v-col>
          <v-col class="pt-0 itemsubject" v-show="viewjudge">Material</v-col>
          <v-col class="pt-0 itemcontent" v-show="viewjudge">{{items[0].material}}</v-col>
          <v-col class="pt-0 itemsubject" v-show="viewjudge">Size</v-col>
          <v-col class="pt-0 itemcontent" v-show="viewjudge">{{items[0].size}}</v-col>
          <v-col class="mb-4 mt-8" style="margin:0 auto;">
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
            <v-btn color="rgba(0,0,0,0.12)" :to="{name: 'shop'}" class="mt-8" block>
              <div style="color:white">BACK TO SHOP</div>
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
    </div>
</template>

<script>
import itemutil from '../mixin/Item.js'
import { VueTyper } from 'vue-typer'
import { ObserveVisibility }from 'vue-observe-visibility'
import loading from './loading.vue'
import detailImgs from '../components/detailImgs.vue'

export default {
  mixins:[itemutil],
  components:{
    VueTyper,
    ObserveVisibility,
    loading,
    detailImgs,
  },
  props:{
    groupID:{type:String, default:'ikuyoT'},//shop.vueのなかのItemlist.vueから送られてくる
  },
  data () {
    return {
      screenloading:true,
      items:null,
      selected: null,
      isVisible01: false,
      counter: 0,
    }
  },
  computed:{
    viewjudge(){
      if(this.items[0].type == '01'){
        return true;
      }
      else{
        return false;
      }
    },
    detailImgs(){
      return this.items[0].samples.map(image => image.sample);
    },
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
    selectableItems(){//在庫の有無はここにつける
      return this.items[0].items.map(item => ( { text: item.listItem, value: item.id }));
    },
    buttonDisabled() {//選択しないとaddcart押せない
      return this.selected === null;
    }
  },
  async created(){
    this.items = await this.$_getItemsFromGroup(this.groupID);
  },
  methods: {
    visibilityChanged01(isVisible01) {
      this.isVisible01 = isVisible01
    },
    addCart () {
      //cartへ商品を送り遷移
      const selectedItem = {
        id: this.selected,
        groupID:this.groupID,
      }
      this.$store.dispatch('cart/addtoCart',selectedItem);
      this.$router.push({ name: 'cart' })//カートへページ遷移
    }
  }
}
</script>


<style scoped>
/* 在庫で表示を変える */
.outofstock{
width:100vw;
height:100vh;
text-align:center;
vertical-align: center;
}

.outofstock p{
  line-height: 100vh;
}

/* 説明文ふわり */
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


/* 文字大きさ */
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
  white-space: pre-wrap;
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

.vue-typer >>> .custom.char.selected {
  background-color: #B759C7;
}

</style>



