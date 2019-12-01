<template>
<div class="z">
<three class="z1"></three>
<v-container class="z2">
  <v-row class="mt-0">
      <v-col v-for="(type,index) in types" :key="index" @click="setType(type.typeid)" cols=4 lg=4 md=4 sm=4 style="font-size:13px;">
      <div class="menu" align="center">{{getTypetext(type)}}</div>
      </v-col> 
      <!-- <v-col class="buket" :class="{ buketchange:dropStatus,buket:dropStatus2 }" cols=12 lg=12 md=12 sm=12><span></span></v-col> -->
  </v-row>
  <v-row justify="center">
    <v-col cols=12 lg=12 md=12 sm=12 class="mt-0 pt-0">
      <div class="menudescription mt-0">
        <!-- <div v-for="(text,index) in typeDescription" :key="index" class="pt-0">{{text}}</div> -->
        <vue-typer class="pt-0" :text=typeDescription></vue-typer>
      </div>
    </v-col>
    
    <v-timeline
      :dense="false"
       style="height:90%;width:90%;"
    >
      <v-timeline-item
        v-for="(item,index) in viewItems"
        :key="index"
        :fill-dot="true"
        small
        color="#954399"
      >
      <item-parts
      :item-data="item"
      @select="onSelect"
      >
      </item-parts>
      <div slot="opposite" style="color:#954399;font-size:11px;font-weight:900">{{item.name}}</div>
      </v-timeline-item>
    </v-timeline>
    </v-row>
</v-container>

</div>
</template>


<script>
import ItemParts from '../components/Itemparts.vue'
import itemutil from '../mixin/Item.js'
import three from "../components/backthree.vue";
import { VueTyper } from 'vue-typer'


export default {
  mixins:[itemutil],
  components:{
    ItemParts,
    three,
    VueTyper
  },
  data(){
    return{
      dropStatus:false,
      dropStatus2:!this.dropStatus,

      activeTypeid:'01',
      types:[
        {
          typeid:'01',
          inactiveText:'原始衣服',
          activeText:'ORIGINAL',
          description:["ikuyoオリジナルアイテム","※受注生産ですので、到着まで2~3週間いただきます"]
        },
        {
          typeid:'02',
          inactiveText:'选择衣服',
          activeText:'SELECT',
          description:["セレクトアイテム","古着をメインにセレクト"]
        },
        {
          typeid:'03',
          inactiveText:'杂货配饰',
          activeText:'GOODS',
          description:["服以外","ステッカーなどなど"] 
        }
      ]
    }
  },
  computed:{
    viewItems(){
      return this.$_getItems({type:this.activeTypeid})
    },
    typeDescription(){//説明文をせんたく
      return this.types.find(type => type.typeid === this.activeTypeid).description;
    },
  },
  methods: {
    getTypetext(type){//ボタンのテキストをせんたく
      if (type.typeid === this.activeTypeid) {
        return type.activeText;
      }
      return type.inactiveText;
    },
    setType(val) {
     this.zchange = !this.zchange;
     this.dropStatus = !this.dropStatus;
     this.activeTypeid = val;
    },
    onSelect(groupID) {
     this.$router.push({name : 'itemdetail', params:{groupID}});//paramsでデータを送ることができる、相手先はpropsで受け取る。この{}は分割代入ではない。
   },
  }
}
</script>

<style>
.vue-typer .custom.char {
  color: #954399;
  background-color: rgb(173, 170, 170);
  font-size: 16px;
}

@keyframes rope {
  0% {
    transform: none;
  }
  33% {
    transform: none;
  }
  33.3% {
    transform: skewX(30deg);
  }
  33.6% {
    transform: skewX(-30deg);
  }
  33.9% {
    transform: none;
  }
  66% {
    transform: none;
  }
  66.3% {
    transform: skewX(5deg);
  }
  66.6% {
    transform: skewX(-5deg);
  }
  66.9% {
    transform: none;
  }
  77% {
    transform: none;
  }
  77.3% {
    transform: skewX(15deg);
  }
  77.6% {
    transform: skewX(-15deg);
  }
  77.9% {
    transform: none;
  }
}


/* 縦線使ってない */
.buket{
  margin-top:-35px;
  width : 1px;
  height: 1vh;
  background-color:transparent;
  transition: all 0.3s ease-in;
  z-index:-2;
}

.buketchange{
  width : 1px;
  height : 100vh;
  background-color:#954399;
  transition: all 0.3s ease-in;
  z-index:-2;

}

/* スクロールふわり */
.normal.delighter {
  transition: all 0.5s ease-out;
  opacity: 0;
}
.normal.delighter.started {
  opacity: 1;
}


/* アニメーション中のスタイル */
.v-enter-active {
    animation: fadeIn 2s ease 0s 1 normal;
    /* safari対応 */
    -webkit-animation: fadeIn 2s ease 0s 1 normal;
}

@keyframes fadeIn {
    0% {opacity: 0}
    100% {opacity: 1}
}

@-webkit-keyframes fadeIn {
    0% {opacity: 0}
    100% {opacity: 1}
}
 
/* アニメーション中のスタイル
.v-enter-active {
    transition: opacity 3s;
    background-color: #954399
}
/* 表示アニメーション */
/* .v-enter {
    opacity: 0;
}
.v-enter-to {
    opacity: 1;
} */ 

.menu{
    color:#954399;
    border:double #954399;
    font-size: 120%;
    font-weight:900;
    margin:2em 0;
    position: relative;
    padding: 0.5em 0.5em;
    border:double 5px #954399;
}
.menu:before, .menu:after{
    content: '';
    position: absolute;
    top: -10px;
    width: 2px;
    height: -webkit-calc(100% + 20px);
    height: calc(100% + 20px);
    background-color: #954399;
}
.menu:before {left: 10px;}
.menu:after {right: 10px;}

.menudescription{
    color:#954399;
    /* border:solid #954399; */
    font-size: 100%;
    font-weight:900;
    margin:2em 0;
    position: relative;
    padding: 0.5em 1.5em;
    /* border:solid 5px #954399; */
    text-align: center;
    background-size:100%;
    background-position:center;
}
/* .menudescription:before, .menudescription:after{
    content: '';
    position: absolute;
    top: -10px;
    width: 7px;
    height: -webkit-calc(100% + 20px);
    height: calc(100% + 20px);
    background-color: #954399;
}
.menudescription:before {left: 10px;}
.menudescription:after {right: 10px;} */




@import url('https://fonts.googleapis.com/css?family=Kosugi+Maru&display=swap');



</style>

