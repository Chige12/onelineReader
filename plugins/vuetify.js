import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  customVariables: ['~/assets/variables.scss'],
  defaultAssets: { icons: 'mdiSvg' },
  icons: {
    iconfont: 'fa'
  },
  theme: {
    themes: {
      light: {
        primary: colors.red.darken1, // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base // #3F51B5
      }
    }
  }
})
