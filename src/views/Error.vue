<template>
 <div>
   <h1>エラー</h1>
   <button @click="goHome">Home</button>
 </div>
</template>



<script>
export default {
  methods: {
    goHome() {
      this.$router.push({ name: 'home'});
    }
  }
}
</script>
