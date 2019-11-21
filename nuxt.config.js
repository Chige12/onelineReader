
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vue-scrollto', ssr:false },
    { src: '~/plugins/vue-meta', ssr:false },
    { src: '~/plugins/mixin-common-methods', ssr:true },
    { src: '~/plugins/vue-chartjs', ssr:false },
    { src: '~/plugins/persistedstate', ssr:false },
    { src: '~/plugins/vuetify', ssr: false },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/markdownit',
    '@nuxtjs/axios'
  ],
  buildModules: [
    '@nuxtjs/vuetify'
  ],
  markdownit: {
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true,  // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  generate: {
    fallback: true,
  },
  vuetify: {
    defaultAssets: { icons: 'mdiSvg' }
  },
}
