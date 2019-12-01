import allItems from './assets/data.json'
import firebase from 'firebase'

export default {
  namespaced: true,//module扱い
  state: {
    dbconnection:null,
    allItems: allItems,//jsonからデータを読み込み
  },
  getters: {//queryって仮引数だよね？
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
}
