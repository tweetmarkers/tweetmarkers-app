<template>
  <bookmark-list
      :bookmarks="bookmarks"
      :actions="actions"
      :has-more="hasMore"
      @refresh="handleRefresh"
      @scroll="handleScroll" />
</template>

<script>
import BookmarkList from '../components/BookmarkList'
import { fetchArchivePage } from '../services/bookmarks'
import { getArchiveActionPreferences } from '../services/preferences'
import { archiveActionTypes } from '../services/actions'
import { noop, delay } from '../services/util'

export default {
  data() {
    return {
      bookmarks: null,
      actions: null,
      hasMore: null
    }
  },
  methods: {
    async handleRefresh(event) {
      await delay(500)

      const page = await fetchArchivePage()

      this.bookmarks = page.results
      this.hasMore = !page.isLast

      event.target.complete()
    },
    async handleScroll(event) {
      console.log('scroll')
      const page = await fetchArchivePage(this.bookmarks.length)

      this.bookmarks.push(...page.results)
      this.hasMore = !page.isLast

      event.target.complete()
    }
  },
  async mounted() {
    const spinner = await this.$ionic.loadingController.create({
      message: 'Loading...'
    })

    await spinner.present()

    const [ page, { start, end } ] = await Promise.all([ fetchArchivePage(), getArchiveActionPreferences() ])

    this.bookmarks = page.results
    this.hasMore = !page.isLast

    this.actions = {
      start: archiveActionTypes.find(({ name }) => name === start)?.value || noop,
      end: archiveActionTypes.find(({ name }) => name === end)?.value || noop
    }

    await spinner.dismiss()
  },
  components: {
    BookmarkList
  }
}
</script>
