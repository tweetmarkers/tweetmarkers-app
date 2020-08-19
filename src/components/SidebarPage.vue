<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="secondary">
          <ion-button @click="toggleMenu">
            <ion-icon slot="icon-only" name="menu"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>
          Tweetmarkers
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  methods: {
    async toggleMenu() {
      await this.$ionic.menuController.toggle('nav')
    }
  },
  async mounted() {
    await this.$ionic.menuController.enable(true, 'nav')
  }
}
</script>
