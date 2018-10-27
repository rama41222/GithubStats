const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Auth Test',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'sd frontend application'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://cdn.linearicons.com/free/1.0.0/icon-font.min.css'},
      {rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.8/css/all.css'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Serif:300,400,500,600'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=GFS+Didot|Lato:100,300,400,700,900'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'}
    ]
  },
  css: [
  ],
  modules: [
    '@nuxtjs/toast',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt'
  ],
  toast: {
    position: 'top-right',
    duration: 2000
  },
  auth: {
    strategies: {
      github: {
        client_id: '0128f170a2535c58c4ed',
      },
    },
    redirect: {
      login: '/?login=1',
      logout: '/',
      home:'/dashboard'
    }
  },
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL:'http://localhost:3001',
  },
  plugins: ['~plugins/vee.js',{ src:'~plugins/spinners.js', ssr: false },'~plugins/axios.js'],
  loading: '~/components/Loading.vue',
  build: {
    vendor: ['vee-validate'],
    extend(config, ctx) {
      
    }
  }
}
