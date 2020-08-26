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
import { fetchPage } from '../services/bookmarks'
import { getBookmarkActionPreferences } from '../services/preferences'
import { bookmarkActionTypes } from '../services/actions'
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

      const page = await fetchPage()

      this.bookmarks = page.results
      this.hasMore = !page.isLast

      event.target.complete()
    },
    async handleScroll(event) {
      const page = await fetchPage(this.bookmarks.length)

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

    const [ page, { start, end } ] = await Promise.all([ fetchPage(), getBookmarkActionPreferences() ])

    this.bookmarks = page.results
    this.hasMore = !page.isLast

    this.actions = {
      start: bookmarkActionTypes.find(({ name }) => name === start)?.value || noop,
      end: bookmarkActionTypes.find(({ name }) => name === end)?.value || noop
    }

    await spinner.dismiss()
  },
  components: {
    BookmarkList
  }
}
</script>
