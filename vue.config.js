const webpack = require('webpack')
const gitRepoInfo = require('git-repo-info')
const { version } = require('./package.json')

const { sha } = gitRepoInfo()

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  chainWebpack: (config) =>
    config.plugin('defineAppVariables').use(new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(version),
      GIT_SHA: JSON.stringify(sha.substring(0, 8))
    })),
  pwa: {
    name: 'Tweetmarkers',
    themeColor: '#1fa0f2',
    msTileColor: '#1fa0f2',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#1fa0f2',
    manifestOptions: {
      background_color: '#ffffff',
      icons: [
        {
          src: 'icons/android-padded-144x144.png',
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
      appleTouchIcon: 'icons/apple-touch-icon-padded-180x180.png',
      maskIcon: 'icon.svg',
      msTileImage: 'icons/tile150x150.png'
    }
  }
}
