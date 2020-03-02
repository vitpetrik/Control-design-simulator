import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#063761",
        button: "#063761",
        background: "#063761",
        drawer_background: '#FAFAFA'
      },
      dark: {
        primary: "#ffffff",
        button: "#039BE5",
        background: "#000000",
        drawer_background: '#000000'
      }
    }
  },
  icons: {
    iconfont: 'mdi',
  },
});
