<template>
<div>
<v-btn @click="setData">add</v-btn>
</div>
</template>


<script>
import firebase from 'firebase'
import allItems from '../assets/data.json'

export default {
  components:{
    
  },
  data(){
    return{
      dbconnection:null,
      allItems:allItems,
    }
  },
  created(){
      console.log('called created');
    var firebaseConfig = {
    apiKey: "AIzaSyCMnTH8vTFh9q3y9Cx_Bb6HkwqjguMztx4",
    authDomain: "ikuyoproject-9e009.firebaseapp.com",
    databaseURL: "https://ikuyoproject-9e009.firebaseio.com",
    projectId: "ikuyoproject-9e009",
    storageBucket: "ikuyoproject-9e009.appspot.com",
    messagingSenderId: "966232363555",
    appId: "1:966232363555:web:7e412b4d1941af98"
    };
    firebase.initializeApp(firebaseConfig);
    this.dbconnection = firebase.firestore();
  },
  computed:{
  },
  methods: {
      async getData(){
        this.dbconnection.collection("items").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        });
        console.log(querySnapshot.docs[2].data().name);
        });
        const query = await this.dbconnection.collection("items").where("groupID", "==", "01").get();
        console.log("aaaaaa",query);
      },
      setData() {
          this.allItems.forEach((item) => {
            this.dbAdd(item);
          })
          this.getData();
      },
      dbAdd(args){
          this.dbconnection.collection("items").add(
              args,
          )
          .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
          console.error("Error adding document: ", error);
          });
      }
  }
}
</script>

//.add(...) と .doc().set(...) は完全に同等なので、どちらでも便利な方を使うことができます。