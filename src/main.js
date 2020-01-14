import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueObserveVisibility from 'vue-observe-visibility'//スクロールで画像浮き上がるプラグイン

Vue.config.productionTip = false
Vue.use(VueObserveVisibility);

Vue.directive('important', {
  bind(el) {
    el.style.color = 'red';
    el.style['font-weight'] = 'bold';
  }
});

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: h => h(App),
})

