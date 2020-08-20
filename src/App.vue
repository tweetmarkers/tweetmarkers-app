<template>
  <device-wrapper>
    <ion-app>
      <ion-menu side="start" menu-id="nav" content-id="main">
        <ion-header>
          <ion-toolbar>
            <ion-title>Menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content scroll-y="false">
          <ion-list>
            <ion-item @click="push('/bookmarks')" :color="getItemColor('/bookmarks')" detail>
              <ion-icon name="bookmark" slot="start" size="small"></ion-icon>
              Home
            </ion-item>
            <ion-item @click="push('/archive')" :color="getItemColor('/archive')" detail>
              <ion-icon name="archive" slot="start" size="small"></ion-icon>
              Archive
            </ion-item>
            <ion-item @click="push('/preferences')" :color="getItemColor('/preferences')" detail>
              <ion-icon name="settings" slot="start" size="small"></ion-icon>
              Preferences
            </ion-item>
          </ion-list>
          <ion-item lines="none" v-if="user">
            <ion-chip @click="goToUserProfile">
              <ion-avatar>
                <img :src="user.avatar" alt="User image">
              </ion-avatar>
              <ion-label>{{user.username}}</ion-label>
            </ion-chip>
            <ion-button @click="logOut()" color="danger" shape="round" fill="clear" slot="end">
              Log out
            </ion-button>
          </ion-item>
          <ion-item lines="none">
            <div class="ion-text-center" style="width: 100%; font-size: .75rem">
              App version 1.0.0-fdai7jrea8f
            </div>
          </ion-item>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main">
        <keep-alive>
          <ion-vue-router />
        </keep-alive>
      </ion-router-outlet>
    </ion-app>
  </device-wrapper>
</template>

<script>
import DeviceWrapper from './components/DeviceWrapper'
import { getUser } from './services/user'

export default {
  data() {
    return {
      user: null
    }
  },
  methods: {
    logOut() {

    },
    goToUserProfile() {
      location.href = 'https://twitter.com/RecuencoJones'
    },
    getItemColor(path) {
      return this.$route.path === path ? 'light' : undefined
    },
    async push(path) {
      await this.$ionic.menuController.toggle('nav')

      if (path !== this.$route.path) {
        this.$router.push(path)
      }
    }
  },
  async mounted() {
    this.user = await getUser()
  },
  components: {
    DeviceWrapper
  }
}
</script>

<style src='@ionic/core/css/core.css'></style>
<style src='@ionic/core/css/ionic.bundle.css'></style>
<style>
ion-navbar.toolbar.toolbar-ios.statusbar-padding,
ion-navbar.toolbar-ios ion-title.title-ios,
ion-toolbar.toolbar.toolbar-ios.statusbar-padding,
ion-toolbar.toolbar-ios ion-title.title-ios {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
</style>
