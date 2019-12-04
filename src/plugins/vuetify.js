import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/styles/main.sass'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);
export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  values: {
    product: 'mdi-dropbox',
    support: 'mdi-lifebuoy',
    steam: 'mdi-steam-box',
    pc: 'mdi-desktop-classic',
    xbox: 'mdi-xbox',
    playstation: 'mdi-playstation',
    switch: 'mdi-nintendo-switch',
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