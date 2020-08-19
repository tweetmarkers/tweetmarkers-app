import Vue from 'vue'
import { archive, unbookmark, markAsRead, markAsUnread, fetchOne, restore } from './bookmarks'

export const archiveItem = (bookmark, index, vm) => ({
  color: 'warning',
  text: 'Archive',
  icon: 'archive',
  async action() {
    await archive(bookmark)
    vm.bookmarks.splice(index, 1)
  }
})

export const restoreItem = (bookmark, index, vm) => ({
  color: 'primary',
  text: 'Restore',
  icon: 'restore',
  async action() {
    await restore(bookmark)
    vm.bookmarks.splice(index, 1)
  }
})

export const removeItem = (bookmark, index, vm) => ({
  color: 'danger',
  text: 'Remove',
  icon: 'remove',
  async action() {
    await unbookmark(bookmark)
    vm.bookmarks.splice(index, 1)
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

export const bookmarkActionTypes = [
  archiveAction,
  removeAction,
  toggleReadAction
]

export const archiveActionTypes = [
  restoreAction,
  removeAction,
  toggleReadAction
]
