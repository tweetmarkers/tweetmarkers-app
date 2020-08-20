<template>
  <sidebar-page>
    <ion-list v-if="bookmarks && actions">
      <transition-group name="list">
        <bookmark-item v-for="(bookmark, index) in bookmarks"
            :key="bookmark.id"
            :bookmark="bookmark"
            :start-option="actions.start(bookmark)"
            :end-option="actions.end(bookmark)"
            @click-start-option="handleAction('start', bookmark, index)"
            @click-end-option="handleAction('end', bookmark, index)" />
      </transition-group>
    </ion-list>
    <ion-loading v-else />
  </sidebar-page>
</template>

<script>
import SidebarPage from '../components/SidebarPage'
import BookmarkItem from '../components/BookmarkSlidingItem'
import { fetchArchivePage } from '../services/bookmarks'
import { getArchiveActionPreferences } from '../services/preferences'
import { archiveActionTypes } from '../services/actions'
import { noop } from '../services/util'

export default {
  data() {
    return {
      bookmarks: null,
      actions: null
    }
  },
  methods: {
    async handleAction(side, bookmark, index) {
      await this.actions[side](bookmark, index, this).action()
    },
    async handleScroll() {
      const page = await fetchArchivePage(this.bookmarks.length)

      this.bookmarks.push(...page)
    }
  },
  async mounted() {
    const spinner = await this.$ionic.loadingController.create({
      message: 'Loading...'
    })

    await spinner.present()

    const [ bookmarks, { start, end } ] = await Promise.all([ fetchArchivePage(), getArchiveActionPreferences() ])

    this.bookmarks = bookmarks

    this.actions = {
      start: archiveActionTypes.find(({ name }) => name === start)?.value || noop,
      end: archiveActionTypes.find(({ name }) => name === end)?.value || noop
    }

    await spinner.dismiss()
  },
  components: {
    SidebarPage,
    BookmarkItem
  }
}
</script>

<style src="../styles/list.css"></style>
