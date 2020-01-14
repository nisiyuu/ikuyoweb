import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cartstore.js'
import item from './itemstore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    item
  },
  state: {
    drawer: false,
  },
  mutations: {
    toggleSideMenu(state) {
      state.drawer = !state.drawer
    },
  },
  actions: {
    toggleSideMenu({ commit }) {
      commit('toggleSideMenu')
    },
  }
})