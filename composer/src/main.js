
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { mapGetters} from 'vuex'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import './assets/styles/bootstrap.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false


store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	localStorage.setItem('store', JSON.stringify(state));
});

new Vue({
  router,
  store,
  render: h => h(App),
  computed: {
    ...mapGetters({getUser: 'UserModule/getUser'})
  },
  beforeCreate() {
		this.$store.commit('initStore')
	},
  created() {
    if(this.getUser.presentations.length <= 0) {
      if(window.location.hash !== '#/') {
        this.$router.push('/')
      }
    }
  }
}).$mount('#app')