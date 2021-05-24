// import colors from 'vuetify/es5/util/colors'
require('dotenv').config()
const Sass = require('sass')
const Fiber = require('fibers')

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  components: true,
  head: {
    titleTemplate: '%s - album',
    title: 'album',
    meta: [
      { charset: 'utf-8' },
      // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css',  integrity:'sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=', crossorigin: 'anonymous' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "typeface-roboto",
    "~/assets/style/main.css"
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/validate.js',
    '~/plugins/scrollbar.js',
    '~/plugins/override.js',
    { src: '~/plugins/persistedState.js', mode: 'client' },
    { src: '~/plugins/core-image-upload.js', mode: 'client' },
    { src: '~/plugins/crop-avatar.js', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
    'cookie-universal-nuxt',
    'nuxt-clipboard2',
    'vue-social-sharing/nuxt',
  ],

  apollo: {
    clientConfigs: {
      default: {
        // httpEndpoint: 'http://localhost:3001/graphql',
        httpEndpoint: process.env.GRAPHQL_URL,
        httpLinkOptions: {
          credentials: 'include'
        }
      }
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.AXIOS_URL,
    credentials: true
  },

  // pwa:{
  //   icon:{
  //     source: './static/icon.png'
  //   },
  //   meta:{
  //     mobileAppIOS: true,
  //     theme_color: "#FFE1C4"
  //   },
  //   manifest: {
  //     name: 'Album',
  //     lang: 'en',
  //     useWebmanifestExtension: false,
  //     start_url: '/',
  //     display: 'standalone'
  //   },
  //   workbox:{
  //     dev: true,
  //     preCaching: [
  //     ]
  //   }
  // },

  // Content module configuration (https://go.nuxtjs.dev/content-config)
  content: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    defaultAssets:false
    // customVariables: ['~/assets/variables.scss'],
    // theme: {
    //   dark: true,
    //   themes: {
    //     dark: {
    //       primary: colors.blue.darken2,
    //       accent: colors.grey.darken3,
    //       secondary: colors.amber.darken3,
    //       info: colors.teal.lighten1,
    //       warning: colors.amber.base,
    //       error: colors.deepOrange.accent4,
    //       success: colors.green.accent3
    //     }
    //   }
    // }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    loader: {
      scss: {
        implementation: Sass,
        sassOptions: {
          fiber: Fiber
        }
      }
    }
  }
}
