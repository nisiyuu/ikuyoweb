import allItems from './assets/data.json'

export default {
  namespaced: true,//module扱い
  state: {
    allItems: allItems,//jsonからデータを読み込み
  },
  getters: {//中身勉強要 
    allItems(state) {
      return (query) => {
          if (query === undefined) {
            return state.allItems;
          }
          return state.allItems.filter(data => Object.keys(query)
              .filter(key => query[key] !== undefined)
              .filter(key => key in data)
              .every(key => query[key] === data[key])
          );
      };
    },
  },
  mutations: {
    
  },
  actions: {
  //   filteringByQuery(obj, query) {
  //     if (!query) {
  //         return obj;
  //     }
  //     return obj.filter(data => Object.keys(query)
  //         .filter(key => query[key] !== undefined)
  //         .filter(key => key in data)
  //         .every(key => query[key] === data[key])
  //     );
  // },
  },
};
