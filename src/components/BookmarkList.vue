<template>
  <sidebar-page>
    <ion-content>
      <template v-if="bookmarks && actions">
        <ion-refresher slot="fixed" @ionRefresh="handleRefresh">
          <ion-refresher-content />
        </ion-refresher>
        <ion-list>
          <transition-group name="list">
            <bookmark-item v-for="(bookmark, index) in bookmarks"
                :key="bookmark.id"
                :bookmark="bookmark"
                :start-option="actions.start(bookmark)"
                :end-option="actions.end(bookmark)"
                @click-start-option="handleAction('start', bookmark, index)"
                @click-end-option="handleAction('end', bookmark, index)" />
            <ion-item v-if="!hasMore" key="last" class="ion-no-padding ion-text-center" style="--inner-padding-end: 0" lines="none">
              <ion-label style="font-size: 2rem; margin-right: 0">
                .
              </ion-label>
            </ion-item>
          </transition-group>
        </ion-list>
        <ion-infinite-scroll @ionInfinite="handleScroll" v-if="hasMore">
          <ion-infinite-scroll-content />
        </ion-infinite-scroll>
      </template>
      <ion-loading v-else />
    </ion-content>
  </sidebar-page>
</template>

<script>
import SidebarPage from '../components/SidebarPage'
import BookmarkItem from '../components/BookmarkSlidingItem'
import { noop, delay } from '../services/util'

export default {
  props: [ 'bookmarks', 'actions', 'hasMore' ],
  methods: {
    async handleAction(side, bookmark, index) {
      await this.actions[side](bookmark, index, this).action()
    },
    async handleRefresh(event) {
      this.$emit('refresh', event)
    },
    async handleScroll(event) {
      this.$emit('scroll', event)
    }
  },
  components: {
    SidebarPage,
    BookmarkItem
  }
}
</script>

<style src="../styles/list.css"></style>
