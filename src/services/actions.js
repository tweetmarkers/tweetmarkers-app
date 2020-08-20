import Vue from 'vue'
import { isPlatform } from '@ionic/core'
import { SocialSharing } from '@ionic-native/social-sharing'
import { showToast } from './toast'
import {
  fetchOne,
  unbookmark,
  archive, restore,
  markAsRead, markAsUnread,
  addLike, removeLike
} from './bookmarks'

export const archiveItem = (bookmark, index, vm) => ({
  color: 'warning',
  text: 'Archive',
  icon: 'archive',
  async action() {
    await archive(bookmark)
    vm.bookmarks.splice(index, 1)

    await showToast({
      message: 'Bookmark archived'
    })
  }
})

export const restoreItem = (bookmark, index, vm) => ({
  color: 'primary',
  text: 'Restore',
  icon: 'restore',
  async action() {
    await restore(bookmark)
    vm.bookmarks.splice(index, 1)

    await showToast({
      message: 'Bookmark restored'
    })
  }
})

export const removeItem = (bookmark, index, vm) => ({
  color: 'danger',
  text: 'Remove',
  icon: 'remove',
  async action() {
    await unbookmark(bookmark)
    vm.bookmarks.splice(index, 1)

    await showToast({
      message: 'Bookmark removed'
    })
  }
})

export const toggleReadItem = (bookmark, index, vm) => ({
  color: 'primary',
  text: bookmark.read ? 'Mark unread' : 'Mark read',
  icon: bookmark.read ? 'unread' : 'read',
  async action() {
    const toggleRead = bookmark.read ? markAsUnread : markAsRead

    await toggleRead(bookmark)
    Vue.set(vm.bookmarks, index, await fetchOne(bookmark))
  }
})

export const toggleLikeItem = (bookmark, index, vm) => ({
  color: 'danger',
  text: bookmark.like ? 'Unlike' : 'Like',
  icon: bookmark.like ? 'unlike' : 'like',
  async action() {
    const toggleLike = bookmark.like ? removeLike : addLike

    await toggleLike(bookmark)
    Vue.set(vm.bookmarks, index, await fetchOne(bookmark))
  }
})

export const shareItem = (bookmark) => ({
  color: 'success',
  text: 'Share',
  icon: 'share',
  async action() {
    if (location.protocol === 'http:') {
      await showToast({
        message: 'Share is not available in development',
        color: 'warning'
      })
    } else if (isPlatform('pwa') || isPlatform('desktop') || isPlatform('mobileweb')) {
      await navigator.share({ url: bookmark.url })
    } else {
      await SocialSharing.share(null, null, null, bookmark.url)
    }
  }
})

export const archiveAction = {
  name: 'Archive',
  value: archiveItem
}

export const restoreAction = {
  name: 'Restore',
  value: restoreItem
}

export const removeAction = {
  name: 'Remove',
  value: removeItem
}

export const toggleReadAction = {
  name: 'Toggle Read',
  value: toggleReadItem
}

export const toggleLikeAction = {
  name: 'Toggle Like',
  value: toggleLikeItem
}

export const shareAction = {
  name: 'Share',
  value: shareItem
}

export const bookmarkActionTypes = [
  archiveAction,
  removeAction,
  toggleReadAction,
  toggleLikeAction,
  shareAction
]

export const archiveActionTypes = [
  restoreAction,
  removeAction,
  toggleReadAction
]
