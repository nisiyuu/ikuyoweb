import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/styles/main.sass'

Vue.use(Vuetify);
export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  breakpoint: {
    thresholds: {
      xs: 340,
      sm: 540,
      md: 800,
      lg: 1280,
    },
    scrollBarWidth: 24,
  },
});