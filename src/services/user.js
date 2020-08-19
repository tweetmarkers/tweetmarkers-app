
const USER_LOCALSTORAGE_KEY = '__user__'
const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY)

let user

if (storedUser) {
  user = JSON.parse(storedUser)
} else {
  user = {
    token: null,
    username: 'RecuencoJones',
    avatar: 'https://pbs.twimg.com/profile_images/1022850815269253122/u_pu2a3R_400x400.jpg'
  }
}

export async function getToken() {
  return Promise.resolve(user.token)
}

export async function getUser() {
  return Promise.resolve({ username: user.username, avatar: user.avatar })
}
