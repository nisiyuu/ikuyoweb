<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>FORM</h1>
      </v-flex>

      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
               <v-text-field v-model="address.name" label="NAME"></v-text-field>
               <v-text-field v-model="address.tel" label="PHONE NUMBER"></v-text-field>
               <v-text-field v-model="address.email" label="EMAIL"></v-text-field>
               <v-text-field v-model="address.address" label="ADRESS"></v-text-field>
               <v-text-field v-model="address.inquery" label="CONTENT"></v-text-field>
               <v-btn @click="$router.push({ name: 'addresses' })">CANCEL</v-btn>
               <v-btn color="info" @click="submit">SAVE</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      address: {}
    }
  },
  methods: {
    submit () {
      this.addAddress(this.address)
      this.$router.push({ name: 'addresses' })
      // this.address = {}
    },
    ...mapActions(['addAddress'])
  }
}
</script>
