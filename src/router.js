import Vue from 'vue'
import { IonicVueRouter } from '@ionic/vue'
import Login from './pages/Index'
import Bookmarks from './pages/Bookmarks'
import Archive from './pages/Archive'
import Preferences from './pages/Preferences'

Vue.use(IonicVueRouter)

export const router = new IonicVueRouter({
  routes: [
    {
      path: '/',
      component: Login
    }, {
      path: '/bookmarks',
      component: Bookmarks
    }, {
      path: '/archive',
      component: Archive
    }, {
      path: '/preferences',
      component: Preferences
    }
  ],
  mode: 'history'
})
