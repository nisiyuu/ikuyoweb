<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>CONTACT</h1>
      </v-flex>


      <v-flex xs12 mt-5 justify-right>
        <router-link :to=" { name: 'address_edit' }">
          <v-btn color="info">
            submit
        </v-btn>
        </router-link>
        </v-flex>

      <v-flex xs12 mt-5 justify-center>
        <v-data-table :headers='headers' :items='addresses'>
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.tel }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.address }}</td>
            <td class="text-xs-left">{{ props.item.inquery }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  created () {
    this.addresses = this.$store.state.addresses
  },
  data () {
    return {
      headers: [
        { text: 'name', value: 'name' },
        { text: 'phone number', value: 'tel' },
        { text: 'email', value: 'email' },
        { text: 'address', value: 'address' },
        { text: 'content',value:'inquery'},
      ],
      addresses: []
    }
  }
}
</script>
