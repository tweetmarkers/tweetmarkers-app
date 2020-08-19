<template>
  <sidebar-page>
    <template v-if="preferences">
      <ion-item class="ion-margin-top">
        <ion-label>
          <strong>Bookmarks Action Gestures</strong>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label>
          Start
        </ion-label>
        <ion-select :value="preferences.bookmarkActions.start" @ionChange="handleChangeStartAction">
          <ion-select-option v-for="option in startBookmarkActionOptions" :key="option.name" :value="option.name">
            {{option.name}}
          </ion-select-option>
          <ion-select-option :value="null">None</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>End</ion-label>
        <ion-select :value="preferences.bookmarkActions.end" @ionChange="handleChangeEndAction">
          <ion-select-option v-for="option in endBookmarkActionOptions" :key="option.name" :value="option.name">
            {{option.name}}
          </ion-select-option>
          <ion-select-option :value="null">None</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item class="ion-margin-top">
        <ion-label>
          <strong>Archive Action Gestures</strong>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Start</ion-label>
        <ion-select :value="preferences.archiveActions.start" @ionChange="handleChangeStartArchiveAction">
          <ion-select-option v-for="option in startArchiveActionOptions" :key="option.name" :value="option.name">
            {{option.name}}
          </ion-select-option>
          <ion-select-option :value="null">None</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>End</ion-label>
        <ion-select :value="preferences.archiveActions.end" @ionChange="handleChangeEndArchiveAction">
          <ion-select-option v-for="option in endArchiveActionOptions" :key="option.name" :value="option.name">
            {{option.name}}
          </ion-select-option>
          <ion-select-option :value="null">None</ion-select-option>
        </ion-select>
      </ion-item>
    </template>
    <ion-loading v-else />
  </sidebar-page>
</template>

<script>
import SidebarPage from '../components/SidebarPage'
import { getBookmarkActionPreferences, setBookmarkActionPreference, getArchiveActionPreferences, setArchiveActionPreference } from '../services/preferences'
import { bookmarkActionTypes, archiveActionTypes } from '../services/actions'

export default {
  data() {
    return {
      preferences: null
    }
  },
  computed: {
    startBookmarkActionOptions() {
      if (!this.preferences) return

      return bookmarkActionTypes.filter(({ name }) => name !== this.preferences.bookmarkActions.end)
    },
    endBookmarkActionOptions() {
      if (!this.preferences) return

      return bookmarkActionTypes.filter(({ name }) => name !== this.preferences.bookmarkActions.start)
    },
    startArchiveActionOptions() {
      if (!this.preferences) return

      return archiveActionTypes.filter(({ name }) => name !== this.preferences.archiveActions.end)
    },
    endArchiveActionOptions() {
      if (!this.preferences) return

      return archiveActionTypes.filter(({ name }) => name !== this.preferences.archiveActions.start)
    }
  },
  methods: {
    async handleChangeStartAction(event) {
      await setBookmarkActionPreference('start', event.detail.value)

      this.preferences.bookmarkActions = await getBookmarkActionPreferences()
    },
    async handleChangeEndAction(event) {
      await setBookmarkActionPreference('end', event.detail.value)

      this.preferences.bookmarkActions = await getBookmarkActionPreferences()
    },
    async handleChangeStartArchiveAction(event) {
      await setArchiveActionPreference('start', event.detail.value)

      this.preferences.archiveActions = await getArchiveActionPreferences()
    },
    async handleChangeEndArchiveAction(event) {
      await setArchiveActionPreference('end', event.detail.value)

      this.preferences.archiveActions = await getArchiveActionPreferences()
    }
  },
  async mounted() {
    const spinner = await this.$ionic.loadingController.create({ message: 'Loading...' })

    await spinner.present()

    this.preferences = {
      bookmarkActions: await getBookmarkActionPreferences(),
      archiveActions: await getArchiveActionPreferences()
    }

    await spinner.dismiss()
  },
  components: {
    SidebarPage
  }
}
</script>
