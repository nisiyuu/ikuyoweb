<template>
<div class="all">
    <v-row justify="end">
      <v-col cols=9 lg=9 md=9 sm=9>
      <transition-group name="item" appear>
      <item-parts
      v-for="(item) in viewItems"
      :key="item.groupID"
      :item-data="item"
      @select="onSelect"
      >
      </item-parts>
      </transition-group>
      </v-col>
    </v-row>

      <div class="typetext">
      <div class="typetextdetail" v-for="(type,index) in types" :key="index" @click="setType(type.typeid)" cols=4 lg=2 md=2 sm=2 style="font-size:14px;color:#B759C7">
      {{getTypetext(type)}}
      </div>
      <vue-typer class="typedescription" :text="typeDescription" :repeat='0' :type-delay='30'></vue-typer>
      </div>

      <!-- <div class="typedescription">
        <vue-typer :text="typeDescription" :repeat='0'></vue-typer>
      </div> -->


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
          activeText:'original',
          description:["ikuyoオリジナルアイテム.時として周りの環境や常識、仕来りにより生まれてくる感情と、自発的に生まれてきた意志とが対極に存在することがある。 私たちは常に、このような意志と感情の間で揺れ動いている。 しかし、そんな狭間にある不安定な状態こそが最も美しいのではないだろうか。"]
        },
        {
          typeid:'02',
          inactiveText:'选择衣服',
          activeText:'select',
          description:["セレクトアイテム.古着をメインにセレクト.時として周りの環境や常識、仕来りにより生まれてくる感情と、自発的に生まれてきた意志とが対極に存在することがある。 私たちは常に、このような意志と感情の間で揺れ動いている。 しかし、そんな狭間にある不安定な状態こそが最も美しいのではないだろうか。"]
        },
        {
          typeid:'03',
          inactiveText:'杂货配饰',
          activeText:'others',
          description:["服以外.ステッカーなどなど.時として周りの環境や常識、仕来りにより生まれてくる感情と、自発的に生まれてきた意志とが対極に存在することがある。 私たちは常に、このような意志と感情の間で揺れ動いている。 しかし、そんな狭間にある不安定な状態こそが最も美しいのではないだろうか。"]
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

<style scoped>
.item-enter{
  opacity: 0;
  transform: translateX(50px);
}
.item-leave-to{
  opacity: 0;
}

.item-enter-active{
  transition: opacity 3s,transform 2s;
}

.item-leave-active {
  transition: opacity 0.01s;
}


.typetext{
  position:fixed;
  top:20%;
  left:5%;
  width:auto;
  height:auto;
}

.typetextdetail{
  width: auto;
  height:8vh;
}

.typedescription{
  position:fixed;
  top:45%;
  left:5%;
  width:auto;
  height:auto;
  /* transform: rotate(-90deg); */
}

.typedescriptiondetail{
  width: auto;
  height:10vh;
}

.vue-typer >>> .custom.char{
  color:black; /* .parentの親属性に所属する .hoge属性に関してのみblackが適応 */
  font-size: calc(0.75rem + ((2.5vw - 4.8px) * 0.9677));  
}


</style>

css vue-typer
https://github.com/cngu/vue-typer#styles
https://qiita.com/kotamat/items/0899ca5936601390e123