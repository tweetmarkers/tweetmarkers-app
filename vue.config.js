module.exports = {
  pwa: {
    name: 'Tweetmarks',
    themeColor: '#1fa0f2',
    msTileColor: '#1fa0f2',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#1fa0f2',
    manifestOptions: {
      icons: [
        {
          src: 'icons/android-144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: 'icons/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icons/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    iconPaths: {
      favicon16: 'icons/favicon-16x16.png',
      favicon32: 'icons/favicon-32x32.png',
      appleTouchIcon: 'icons/apple-touch-icon-180x180.png',
      maskIcon: 'icon.svg',
      msTileImage: 'icons/tile150x150.png'
    }
  }
}
