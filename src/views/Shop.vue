<template>
<div class="z">
  <itemlist class="z2"></itemlist>
</div>
</template>

<script>
import itemlist from '../components/Itemlist.vue'
import itemutil from '../mixin/Item.js'
import store from '../store.js'

export default {
  mixins:[itemutil],
  components:{
    itemlist,
  },
  computed:{
  },
}
</script>

<style>
.z{
  position: relative;
}

.z1{
  position: absolute;
    top: 0px;
    left: 0px;
    z-index:1;
}

.z2{
  position: relative;
  z-index:2;
}


</style>
