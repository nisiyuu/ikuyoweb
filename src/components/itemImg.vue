<template>
  <div>
    <v-row>
      <v-col cols=12 lg=12 md=12 sm=12 class="mt-10 pa-0" align="center">
        <img :src="src" @load="load"
        style="width:50%;height:auto;"
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props:{
    src:''
  },
  methods:{
    load(){
      this.$emit('loaded')
    }
  }
}
</script>

<style scoped>

</style>
