export default {
  namespaced: true,//module扱い
  state: {
    userCart: [
     
    ],
  },
  getters: {
    userCart: (state) => state.userCart,
  },
  mutations: {
    userCart(state, item) {
      state.userCart.push(item);
    },
    deleteItem(state, id) {
      state.userCart = state.userCart.filter(item => item.id !== id);
    }
  },
  actions: {
    async addtoCart(context, item) {
      context.commit('userCart', item);
    },
    async deleteItem(context, id) {
      context.commit('deleteItem', id)
    }
  },
}
