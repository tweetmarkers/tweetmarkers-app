import Vue from 'vue'
import axios from 'axios'
import { IonicVueRouter } from '@ionic/vue'
import Login from './pages/Index'
import Bookmarks from './pages/Bookmarks'
import Archive from './pages/Archive'
import Preferences from './pages/Preferences'

Vue.use(IonicVueRouter)

async function loginGuard(next) {
  const { data } = await axios.get('/api/session')

  if (data.isLoggedIn) {
    next('/bookmarks')
  } else {
    next()
  }
}

async function authenticatedGuard(next) {
  const { data } = await axios.get('/api/session')

  if (!data.isLoggedIn) {
    next('/')
  } else {
    next()
  }
}

export const router = new IonicVueRouter({
  routes: [
    {
      path: '/',
      component: Login,
      async beforeEnter(to, from, next) {
        await loginGuard(next)
      }
    }, {
      path: '/bookmarks',
      component: Bookmarks,
      async beforeEnter(to, from, next) {
        await authenticatedGuard(next)
      }
    }, {
      path: '/archive',
      component: Archive,
      async beforeEnter(to, from, next) {
        await authenticatedGuard(next)
      }
    }, {
      path: '/preferences',
      component: Preferences,
      async beforeEnter(to, from, next) {
        await authenticatedGuard(next)
      }
    }
  ],
  mode: 'history'
})
