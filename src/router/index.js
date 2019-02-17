import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

import {
  clearUser,
  canAccessTo
} from '../libs/util'
import store from '@/store'
import iView from 'iview';

window.$bus = new Vue() //全局消息总线

Vue.use(Router)

const LOGIN_PAGE = 'login'
const router = new Router({
  routes,
  mode: 'hash'
})

window.$bus.$on('login_exp', () => {
  clearUser()
  store.commit('clearUser')
  router.push({
    name: LOGIN_PAGE
  })
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  console.log(store.state.user)
  const token = store.state.user.token
  if (!token) {
    if (to.name !== LOGIN_PAGE) {
      next({
        name: 'login'
      })
      iView.LoadingBar.finish()
    } else {
      next()
    }
  } else {
    if (to.name === LOGIN_PAGE) {
      console.log(to.name)
      next({
        name: 'home'
      })
    } else {
      const access = store.state.user.access
      if (canAccessTo(to.name, access, routes)) {
        next()
      } else {
        next({
          name: 'err401'
        })
      }
    }
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
