<template>
  <device-wrapper>
    <ion-app style="background: #ffffff">
      <ion-menu side="start" menu-id="nav" content-id="main">
        <ion-header>
          <ion-toolbar>
            <ion-title>Menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content scroll-y="false">
          <ion-item
              v-if="user"
              style="
                --ion-item-background: #1fa0f2;
                --ion-item-color: #ffffff;
                --min-height: 6rem;
                background: var(--ion-item-background);
              "
              lines="none"
              detail="false"
              href="https://twitter.com/RecuencoJones"
              target="_blank"
          >
            <ion-avatar slot="start">
              <img :src="user.avatar" alt="User image">
            </ion-avatar>
            <ion-label>
              <strong>{{user.username}}</strong>
            </ion-label>
          </ion-item>
          <ion-item-divider color="#ffffff"></ion-item-divider>
          <ion-list>
            <ion-item @click="push('/bookmarks')" :color="getItemColor('/bookmarks')" detail style="--inner-border-width: 0.55px 0px 0.55px 0px;">
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
          <ion-list>
            <ion-item @click="logOut()" color="danger" detail>
              <ion-icon name="logout" slot="start" size="small"></ion-icon>
              Log out
            </ion-item>
          </ion-list>
          <ion-item lines="none">
            <div class="ion-text-center" style="width: 100%; font-size: .75rem">
              App version {{version}}-{{sha}}
            </div>
          </ion-item>
          <ion-item lines="none">
            <div style="width: 100%; display: flex; justify-content: space-around">
              <ion-button fill="clear" color="dark" href="https://github.com/tweetmarkers" target="_blank" title="GitHub repository">
                <ion-icon name="github" slot="icon-only"></ion-icon>
              </ion-button>
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
      user: null,
      version: APP_VERSION,
      sha: GIT_SHA
    }
  },
  methods: {
    async logOut() {
      this.$router.push('/')
      await this.$ionic.menuController.close('nav')
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
