import { delay } from './util'

const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

function * generateBookmarks() {
  while (true) {
    yield new Array(100).fill(0).map((_, index) => ({
      id: index,
      content: content.substring(0, content.length / (index % 5)),
      author: 'RecuencoJones',
      date: new Intl.DateTimeFormat().format(new Date()),
      read: index % 3 === 0,
      like: index % 2 === 0,
      archived: index % 5 === 0,
      url: 'https://twitter.com/RecuencoJones/status/1295662438126358528'
    }))
  }
}

const generator = generateBookmarks()
const bookmarksDB = generator.next().value

export async function fetchPage(start = 0, limit = 20) {
  await delay(500);

  const bookmarks = bookmarksDB.filter(({ archived }) => !archived)
  const isLast = start + limit >= bookmarks.length

  return {
    results: bookmarks.slice(start, start + limit),
    isLast,
    nextStart: isLast ? null : start + limit
  }
}

export async function fetchArchivePage(start = 0, limit = 20) {
  await delay(500);

  const bookmarks = bookmarksDB.filter(({ archived }) => archived)
  const isLast = start + limit >= bookmarks.length

  return {
    results: bookmarks.slice(start, start + limit),
    isLast,
    nextStart: isLast ? null : start + limit
  }
}

export async function fetchOne({ id }) {
  return bookmarksDB.find((bookmark) => bookmark.id === id)
}

export async function archive(bookmark) {
  const index = bookmarksDB.findIndex(({ id }) => bookmark.id === id)

  bookmarksDB[index] = {
    ...bookmarksDB[index],
    archived: true
  }
}

export async function restore(bookmark) {
  const index = bookmarksDB.findIndex(({ id }) => bookmark.id === id)

  bookmarksDB[index] = {
    ...bookmarksDB[index],
    archived: false
  }
}

export async function unbookmark(bookmark) {
  const index = bookmarksDB.findIndex(({ id }) => bookmark.id === id)

  bookmarksDB.splice(index, 1)
}

export async function markAsRead(bookmark) {
  const index = bookmarksDB.findIndex(({ id }) => bookmark.id === id)

  bookmarksDB[index] = {
    ...bookmarksDB[index],
    read: true
  }
}

export async function markAsUnread(bookmark) {
  const index = bookmarksDB.findIndex(({ id }) => bookmark.id === id)

  bookmarksDB[index] = {
    ...bookmarksDB[index],
    read: false
  }
}

export async function addLike(bookmark) {
  const index = bookmarksDB.findIndex(({ id }) => bookmark.id === id)

  bookmarksDB[index] = {
    ...bookmarksDB[index],
    like: true
  }
}

export async function removeLike(bookmark) {
  const index = bookmarksDB.findIndex(({ id }) => bookmark.id === id)

  bookmarksDB[index] = {
    ...bookmarksDB[index],
    like: false
  }
}
