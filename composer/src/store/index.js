import Vue from 'vue'
import Vuex from 'vuex'
import { version } from '../../package.json'
Vue.use(Vuex)
import AppModule from './app.module'
import UserModule from './user.module'
import PresentationModule from'./presentation.module'
import SlideEditModule from'./slideEdit.module'

export default new Vuex.Store({
  modules: {
    AppModule,
    UserModule,
    PresentationModule,
    SlideEditModule
  },
  mutations: {
    initStore(state){
      let store = JSON.parse(localStorage.getItem('store'))
      if (store) {
        // Check the version stored against current. If different, don't
        // load the cached version
        if(store.version === version) {
          this.replaceState(
            state = Object.assign({}, store)
          );
        } else {
          state.version = version
          localStorage.removeItem('store')
        }
      }
    }
  }
})
