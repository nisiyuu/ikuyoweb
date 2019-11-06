import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import cart from './cartstore.js'
import item from './itemstore.js'
import router from './router.js'


Vue.use(Vuex)

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))

export default new Vuex.Store({
  modules: {
    cart,
    item
  },
  state: {
    login_user: null,
    drawer: false,
    addresses: [],
    cartitem: [],
    message: '',
    loading: false
  },
  mutations: {
    start(state) {
      state.loading = true
    },
    end(state) {
      setTimeout(function(){state.loading = false}, 500);
    },
    setLoginUser(state, user) {
      state.login_user = user
    },
    deleteLoginUser(state) {
      state.login_user = null
    },
    toggleSideMenu(state) {
      state.drawer = !state.drawer
    },
    addAddress(state, address) {
      state.addresses.push(address)
    },

    addtoCart(state, { id, payload }) {
      payload.id = id
      state.cartitem.push(payload)
    },

    deleteProducts(state, { id }) {
      const index = state.cartitem.findIndex(payload => payload.id === id)

      state.cartitem.splice(index, 1)
    },
  },
  actions: {
    addtoCart({ commit }, payload) {
      firebase.firestore().collection(`users/id/products/`).add(payload).then(doc => {
        commit('addtoCart', { id: doc.id, payload })     //commit関数は呼び出す関数の名前を第一引数に入れ、第二引数にmutationsで使用する値を入れる
      })
    },
    
    fetchProducts({ getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/products/`).get().then(snapshot => {
        snapshot.forEach(doc => commit(`addtoCart`, { id: doc.id, payload: doc.data() }))
      })
    },

    deleteProducts({ commit }, { id }) {
      firebase.firestore().collection(`users/id/products/`).doc(id).delete().then(() => {
        commit('deleteProducts', { id })
      })
    },

    
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user)
    },

    deleteLoginUser({ commit }) {
      commit('deleteLoginUser')
    },
    
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },

    logout() {
      firebase.auth().signOut()
    },

    toggleSideMenu({ commit }) {
      commit('toggleSideMenu')
    },

    addAddress({ commit }, address) {
      commit('addAddress', address)
    },
  }
})
  
  
  
  // getters:{
  //   userName: state => state.login_user ? state.login_user.displayName : '',
  //   photoURL: state => state.login_user ? state.login_user.photoURL : '',
  //   uid: state => state.login_user ? state.login_user.uid : null
  //   // getAddressById: state => id => state.cartitem.find(product => product.id === id)
  // }



//gettersありの時＝＞ログインユーザのみがカートに追加削除できる
// addtoCart({ getters, commit }, payload) {
//   firebase.firestore().collection(`users/${getters.uid}/products/`).add(payload).then(doc => {
//     commit('addtoCart', { id: doc.id, payload})     //commit関数は呼び出す関数の名前を第一引数に入れ、第二引数にmutationsで使用する値を入れる
//    })
//  },
//  fetchProducts({ getters, commit }) {
//    firebase.firestore().collection(`users/${getters.uid}/products/`).get().then(snapshot =>{
//      snapshot.forEach(doc => commit(`addtoCart`, { id: doc.id, payload: doc.data()}))
//    })
//  },

//  deleteProducts ({ getters,commit }, { id }) {
//    firebase.firestore().collection(`users/${getters.uid}/products/`).doc(id).delete().then(() => {
//      commit('deleteProducts', { id })
//    })
//  },