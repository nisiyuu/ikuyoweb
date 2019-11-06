<template>
  <v-container fluid>
    <v-sparkline
      :value="value"
      :gradient="gradient"
      :smooth="radius || false"
      :padding="padding"
      :line-width="width"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      auto-draw
    ></v-sparkline>
  </v-container>
</template>


<script>
  const gradients = [
    ['#000000'],
    // ['#222'],
    // ['#42b3f4'],
    // ['red', 'orange', 'yellow'],
    // ['purple', 'violet'],
    // ['#00c6ff', '#F0F', '#FF0'],
    // ['#f72047', '#ffd200', '#1feaea']
  ]

  export default {
    data: () => ({
      width: 10,
      radius: 10,
      padding: 20,
      lineCap: 'round',
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: 'top',
      gradients
    })
  }
</script>
