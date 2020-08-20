import Vue from 'vue'
import Ionic from '@ionic/vue'
import './icons'
import { router } from './router'
import App from './App.vue'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import './registerServiceWorker'

(async () => {
  defineCustomElements(window)

  Vue.config.ignoredElements = [/^ion-/]
  Vue.config.productionTip = false
  Vue.use(Ionic)

  // let $ionic controllers initialize
  await Vue.nextTick()

  new Vue({
    router,
    render: (h) => h(App)
  }).$mount('#app')
})()
