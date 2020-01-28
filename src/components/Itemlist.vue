<template>
  <div>
    <!-- ローディング画面 -->
    <loading v-show="screenloading"/>
    <!-- 本画面 -->
    <div v-show="!screenloading">
      <v-container>
      <v-row justify="center">
        <v-col cols=9 lg=9 md=9 sm=9>
          <transition-group name="item" appear mode="out-in">
            <item-parts
            v-for="(item) in itemlist"
            :key="item.groupID"
            :item-data="item"
            @select="onSelect"
            >
            </item-parts>
          </transition-group>
          </v-col>
      </v-row>
      <!-- カテゴリ選択 -->
      <div class="typetext">
        <div class="typetextdetail" v-for="(type,index) in types" :key="index" @click="setType(type.typeid)" cols=4 lg=2 md=2 sm=2 style="font-size:14px;color:#B759C7">
          {{getTypetext(type)}}
        </div>
      </div>
      <!-- <div class="typedescription">
        <vue-typer :text="typeDescription" :repeat='0'></vue-typer>
      </div> -->
      </v-container>
    </div>
  </div>
</template>

<script>
import ItemParts from '../components/Itemparts.vue'
import itemutil from '../mixin/Item.js'
import { VueTyper } from 'vue-typer'
import loading from '../views/loading.vue'

export default {
  mixins:[itemutil],
  components:{
    ItemParts,
    VueTyper,
    loading,
  },
  data(){
    return{
      screenloading:true,
      itemlist:null,
      dropStatus:false,
      activeTypeid:'01',
      types:[
        {
          typeid:'01',
          inactiveText:'原始衣服',
          activeText:'original',
          description:["ikuyoオリジナルアイテム.受注生産ですので到着まで3~4週間かかります。"]
        },
        {
          typeid:'02',
          inactiveText:'选择衣服',
          activeText:'select',
          description:["セレクトアイテム."]
        },
        {
          typeid:'03',
          inactiveText:'杂货配饰',
          activeText:'others',
          description:["ステッカーなどなど."]
        }
      ]
    }
  },
  async mounted(){
    this.itemlist = await this.$_getItemsFromType(this.activeTypeid);
    this.screenloading = false;
    // const self = this;
    // setTimeout(function() {self.screenloading = false},0);
  },
  computed:{
    typeDescription(){//説明文をせんたく
      return this.types.find(type => type.typeid === this.activeTypeid).description;
    },
  },
  methods: {
    getTypetext(type){//カテゴリ選択
      if (type.typeid === this.activeTypeid) {
        return type.activeText;
      }
      return type.inactiveText;
    },
    async setType(val) {
     this.zchange = !this.zchange;
     this.dropStatus = !this.dropStatus;
     this.activeTypeid = val;
     this.itemlist = await this.$_getItemsFromType(this.activeTypeid);
    },
    onSelect(groupID) {
     this.$router.push({name : 'itemdetail', params:{groupID}});//paramsでURLパラメータを送る。この{}は分割代入ではない。
    },
  },
}
</script>

<style scoped>
/* ページ遷移時 */
.fade-enter{
  opacity: 0;
  transform: translateX(100px);
}

.fade-leave-to{
  opacity: 0;
}

.fade-enter-active{
  transition: opacity 2s,transform 2s;
}

.fade-leave-active {
  transition: opacity 0.1s,
}




.item-enter{
  opacity: 0;
  transform: translateX(100px);
}

.item-leave-to{
  opacity: 0;
}

.item-enter-active{
  transition: opacity 2s,transform 2s;
}

.item-leave-active {
  transition: opacity 0.1s,
}

.typetext{
  position:fixed;
  top:20%;
  left:7%;
  width:auto;
  height:auto;
}

.typetextdetail{
  width: auto;
  height:8vh;
  font-size: calc(0.75rem + ((1vw - 4.8px) * 0.9677));
}

.typedescription{
  position:fixed;
  top:45%;
  left:5%;
  width:70%;
  height:auto;
  /* transform: rotate(-90deg); */
}

.typedescriptiondetail{
  width: auto;
  height:10vh;
}

.vue-typer >>> .custom.char{
  color:black; /* .parentの親属性に所属する .hoge属性に関してのみblackが適応 */
  /* font-size: calc(0.75rem + ((2.5vw - 4.8px) * 0.9677));   */
}
</style>

css vue-typer
https://github.com/cngu/vue-typer#styles
https://qiita.com/kotamat/items/0899ca5936601390e123

非同期処理の書く場所
https://stackoverflow.com/questions/56510302/javascript-async-function-returns-object-promise