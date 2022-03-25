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
import { fetchBookmarksPage } from '../services/bookmarks'
import { getBookmarkActionPreferences } from '../services/preferences'
import { bookmarkActionTypes } from '../services/actions'
import { noop } from '../services/util'

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
      const { next, results } = await fetchBookmarksPage()

      this.bookmarks = results
      this.next = next
      this.hasMore = !!next

      event.target.complete()
    },
    async handleScroll(event) {
      const { next, results } = await fetchBookmarksPage(this.next)

      this.bookmarks.push(...results)
      this.next = next
      this.hasMore = !!next

      event.target.complete()
    }
  },
  async mounted() {
    const spinner = await this.$ionic.loadingController.create({
      message: 'Loading...'
    })

    await spinner.present()

    const [ { next, results }, { start, end } ] = await Promise.all([ fetchBookmarksPage(), getBookmarkActionPreferences() ])

    this.bookmarks = results
    this.next = next
    this.hasMore = !!next

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
