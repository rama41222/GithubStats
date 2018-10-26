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
        client_secret: '8c7da198caf393e3ad94ec5391e470dd826be5a1',
        user:true,
        scope:['user','public_repo'],
        redirect_uri:'http://localhost:3003/callback'
      },
    },
    redirect: {
      login: '/?login=1',
      logout: '/',
    }
  },
  /*
  ** Axios module configuration
  */
  axios: {
  },
  plugins: ['~plugins/vee.js',{ src:'~plugins/spinners.js', ssr: false },'~plugins/axios.js'],
  loading: '~/components/Loading.vue',
  build: {
    vendor: ['vee-validate'],
    extend(config, ctx) {
      
    }
  }
}
