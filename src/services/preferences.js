import { archiveAction, restoreAction, toggleReadAction, removeAction } from './actions'
import { delay } from './util'

const DEFAULT_PREFERENCES = {
  bookmarkActions: {
    start: archiveAction.name,
    end: toggleReadAction.name
  },
  archiveActions: {
    start: restoreAction.name,
    end: removeAction.name
  }
}
const PREFERENCES_LOCALSTORAGE_KEY = '__preferences__'
const storedPreferences = localStorage.getItem(PREFERENCES_LOCALSTORAGE_KEY)

let preferences

if (storedPreferences) {
  preferences = JSON.parse(storedPreferences)
} else {
  preferences = DEFAULT_PREFERENCES
  localStorage.setItem(PREFERENCES_LOCALSTORAGE_KEY, JSON.stringify(preferences))
}

export async function getBookmarkActionPreferences() {
  return delay(500).then(() => preferences.bookmarkActions)
}

export async function setBookmarkActionPreference(side, value) {
  preferences.bookmarkActions[side] = value
  localStorage.setItem(PREFERENCES_LOCALSTORAGE_KEY, JSON.stringify(preferences))
}

export async function getArchiveActionPreferences() {
  return delay(500).then(() => preferences.archiveActions)
}

export async function setArchiveActionPreference(side, value) {
  preferences.archiveActions[side] = value
  localStorage.setItem(PREFERENCES_LOCALSTORAGE_KEY, JSON.stringify(preferences))
}
