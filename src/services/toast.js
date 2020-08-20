import { toastController } from '@ionic/core'

const TOAST_DEFAULT_OPTIONS = {
  duration: 1500,
  color: 'dark',
  cssClass: 'ion-text-center'
}

export async function showToast(opts = {}) {
  const toast = await toastController.create({
    ...TOAST_DEFAULT_OPTIONS,
    ...opts
  })

  await toast.present()

  return toast
}
