<template>

<div>
  <div v-for="(item,index) in viewItems" :key="index">
    <item-parts
      :item-data="item"
      @select="onSelect">
    </item-parts>
  </div>


</div>
</template>


<script>
import ItemParts from '../components/Itemparts.vue'
import itemutil from '../mixin/Item.js'

export default {
  mixins:[itemutil],
  components:{
    ItemParts
  },
  props: {
    query: { type: Object },//これどこから受けとってる？propsについてはどこかで属性として定義されていたものを受け取るイメージしかない
  },
  computed:{
    viewItems(){
      return this.$_getItems(this.query)//queryという引数があれば該当のgroupIDのItemを渡す
    }
  },
  methods: {
   onSelect(groupID) {
    //  window.alert(groupId);
     this.$router.push({name : 'itemdetail', params:{groupID}});//paramsでデータを送ることができる、相手先はpropsで受け取る。この{}は分割代入ではない。
   },
  }
}
</script>

