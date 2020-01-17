import firebase from 'firebase'

export default {
  namespaced: true,//module扱い
  state: {
    dbconnection: null,
    activeTypeid: "01",
  },
  getters: {
    dbconnection(state) {
      if (state.dbconnection !== null) {
        return state.dbconnection;
      }
      const firebaseConfig = {
        apiKey: "AIzaSyCMnTH8vTFh9q3y9Cx_Bb6HkwqjguMztx4",
        authDomain: "ikuyoproject-9e009.firebaseapp.com",
        databaseURL: "https://ikuyoproject-9e009.firebaseio.com",
        projectId: "ikuyoproject-9e009",
        storageBucket: "ikuyoproject-9e009.appspot.com",
        messagingSenderId: "966232363555",
        appId: "1:966232363555:web:7e412b4d1941af98",
        measurementId: "G-VST9VT20Y2"
      };
      firebase.initializeApp(firebaseConfig);
      state.dbconnection = firebase.firestore();
      return state.dbconnection;
    },
  },
  mutations: {
    
  },
  actions: {
    async getItemsFromType(context,type) {
      const items = await context.getters.dbconnection.collection("items").where("type", "==", type).get()
        .then(querySnapshot => {
           return querySnapshot.docs.map(elem => elem.data())
        })
      return items
    },
    async getItemsFromGroup(context, groupID) {
      const items = await context.getters.dbconnection.collection("items").where("groupID", "==", groupID).get()
      .then(querySnapshot => {
         return querySnapshot.docs.map(elem => elem.data())
      })
      return items
    },
  },
}