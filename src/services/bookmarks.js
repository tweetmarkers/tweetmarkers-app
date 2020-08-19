function * generateBookmarks() {
  while (true) {
    yield new Array(100).fill(0).map((_, index) => ({
      id: index,
      content: 'Lorem ipsum',
      author: `Author ${index}`,
      read: index % 3 === 0,
      archived: index % 5 === 0,
      url: 'https://twitter.com/RecuencoJones/status/1295662438126358528'
    }))
  }
}

const generator = generateBookmarks()
const bookmarksDB = generator.next().value

export async function fetchPage(start = 0, limit = 20) {
  return bookmarksDB.filter(({ archived }) => !archived).slice(start, start + limit)
}

export async function fetchArchivePage(start = 0, limit = 20) {
  return bookmarksDB.filter(({ archived }) => archived).slice(start, start + limit)
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
