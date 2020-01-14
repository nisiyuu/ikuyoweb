import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Shop from './views/Shop.vue'
import Itemdetail from './views/Itemdetail.vue'
import Cart from './views/Cart.vue'
import Error from './views/Error.vue'
import Pay from './views/Pay.vue'
import loading from './views/loading.vue'
import Success from './views/Success.vue'
import Failure from './views/Failure.vue'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  scrollBehavior () {//常に一番上から表示
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    
    {
      path: '/itemdetail/:groupID',//idで管理できる
      name: 'itemdetail',
      component: Itemdetail,
      props:true//propsを有効にする
    }, 

    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },

    {
      path: '/pay',
      name: 'stripe',
      component: Pay
    },
    {
      path: '/loading',
      name: 'loading',
      component: loading
    },
    {
      path: '/instagram',
      name: 'instagram',
      beforeEnter() {
        // Put the full page url including the protocol http(s) below
        window.location = "https://www.instagram.com/ikuyo_club/?hl=ja"
      }
    },
    {
      path: '/mail',
      name: 'mail',
      beforeEnter() {
        // Put the full page url including the protocol http(s) below
        window.location = "mailto:ikuyoclub@gmail.com?subject=問い合わせ&amp;"
      }
    },

    {
      path: '/success',
      name: 'success',
      component: Success
    },

    {
      path: '/failure',
      name: 'failure',
      component: Failure
    },

    {
      path: '*',//全てのルート
      name: 'error',
      component: Error//上から順にマッチングされる
    },

  ]
})

export default router