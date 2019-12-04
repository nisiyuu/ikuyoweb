<template>
<div class="z">
  <transition>
  <itemlist class="z2"></itemlist>
  </transition>
</div>
</template>

<script>
import itemlist from '../components/Itemlist.vue'
import itemutil from '../mixin/Item.js'
// import store from '../store.js'

export default {
  mixins:[itemutil],
  components:{
    itemlist,
  },
  computed:{
  },
}
</script>

<style scoped>
.fade-enter,
.fade-leave-to{
  opacity: 0;
  transform: translateX(50px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 4s,transform 4s;
}

</style>
