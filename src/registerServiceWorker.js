/* eslint-disable no-console */

import { register } from 'register-service-worker'
import { showToast } from './services/toast'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    async updated (reg) {
      console.log('New content is available; please refresh.')
      await showToast({
        message: 'New version available!',
        color: '#1fa0f2',
        cssClass: '',
        duration: 0,
        buttons: [
          {
            side: 'end',
            text: 'REFRESH',
            handler: () => {
              reg.waiting.postMessage({ type: 'SKIP_WAITING' })
              location.reload()
            }
          }
        ]
      })
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
