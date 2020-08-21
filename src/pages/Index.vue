<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tweetmarkers</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :y-scroll="false">
      <div style="display: flex; flex-direction: column; height: 100%" class="ion-justify-content-around ion-align-items-center">
        <div class="ion-text-center">
          <img src="/icon.svg" style="width: 75%" alt="Tweetmarkers logo" />
        </div>
        <div>
          <ion-button style="background-color: #1fa0f2" expand="full" @click="logIn">
            <ion-icon name="twitter" slot="start"></ion-icon>
            Login with Twitter
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import DeviceWrapper from '../components/DeviceWrapper'

export default {
  methods: {
    async logIn() {
      const spinner = await this.$ionic.loadingController.create({
        message: 'Loading...'
      })

      await spinner.present()

      this.$router.push('/bookmarks')

      await spinner.dismiss()
    }
  },
  components: {
    DeviceWrapper
  }
}
</script>
