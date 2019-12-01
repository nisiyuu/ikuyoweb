import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import vuetify from './plugins/vuetify'
import VueObserveVisibility from 'vue-observe-visibility'//スクロールで画像浮き上がるプラグイン

Vue.config.productionTip = false
Vue.use(VueObserveVisibility);

// require('intersection-observer');

  // Your web app's Firebase configuration
  // var firebaseConfig = {
  //   apiKey: "AIzaSyCMnTH8vTFh9q3y9Cx_Bb6HkwqjguMztx4",
  //   authDomain: "ikuyoproject-9e009.firebaseapp.com",
  //   databaseURL: "https://ikuyoproject-9e009.firebaseio.com",
  //   projectId: "ikuyoproject-9e009",
  //   storageBucket: "ikuyoproject-9e009.appspot.com",
  //   messagingSenderId: "966232363555",
  //   appId: "1:966232363555:web:7e412b4d1941af98"
  // };
  // // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);

  // Vue.directive('scroll', {
  //   inserted: function(el, binding) {
  //     let f = function(evt) {
  //       if (binding.value(evt, el)) {
  //         window.removeEventListener('scroll', f);
  //       }
  //     };
  //     window.addEventListener('scroll', f);
  //   },
  // });

  Vue.directive('important', {
    bind(el) {
       el.style.color = 'red';
       el.style['font-weight'] = 'bold';
      }
   });


// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: h => h(App),
})

