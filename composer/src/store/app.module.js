import Vue from 'vue'
const getMessageDefaultState = () => {
  return {
      text: '',
      type: '' //danger, warning, info
    }
}
const getPresentationDefaultState = () => {
  return {
    id: '',
    presentationId: '',
    name: '',
    product: '',
    useShared: true,
    isConfSaved: true,
    savedSlides: [],
    dimensions: {
      width: 1024,
      height: 768
    }
  }
}
// State object
const state = {
  app: {
    version: '',
    message: getMessageDefaultState(),
    presentation: getPresentationDefaultState(),
    view: {
      size: {
        width: 0,
        height: 0
      }
    }
  },
  constants: {
    slide: {
      id: '',
      backgroundUrl: '',
      ctas: [],
      isActive: true
    }
  }
}


// Getter functions
const getters = {
  getApp(state) {
     return state.app
  },
  getConstSlide(state) {
    return state.constants.slide
  }
}



// Mutations
const mutations = {
  SET_MESSAGE(state, payload) {
    Vue.set(state.app, 'message', payload)
  },
  DELETE_MESSAGE(state) {
    Vue.set(state.app, 'message', getMessageDefaultState())
  },
  SET_VIEW_SIZE(state, payload) {
    Vue.set(state.app.view, 'size', payload)
  },
  SET_PRESENTATION(state, payload) {
    Vue.set(state.app, 'presentation', payload)
  },
  DELETE_PRESENTATION(state) {
    Vue.set(state.app, 'presentation', getPresentationDefaultState())
  },
  SET_CONFIG_SAVED_STATE(state, payload) {
    Vue.set(state.app.presentation, 'isConfSaved', payload)
  },
  SET_SAVED_SLIDES(state, payload) {
    Vue.set(state.app.presentation, 'savedSlides', payload)
  }
}



// Actions
const actions = {
  setAppMessage({getters, commit}, payload){
    let app = getters.getApp
    let message = Object.assign({}, app.message)
    message.text = payload.text
    message.type = payload.type
    commit('SET_MESSAGE', message)
  },
  deleteAppMessage({commit}) {
    commit('DELETE_MESSAGE')
  },
  setAppViewSize({commit}, payload) {
    commit('SET_VIEW_SIZE', payload)
  },
  setTemporalPresentationConfig({getters, commit}, payload) {
    let app = getters.getApp
    let presentation = Object.assign({}, app.presentation)

    presentation.presentationId = payload.presentationId
    presentation.name = payload.name
    presentation.product = payload.product
    presentation.useShared = payload.useShared
    presentation.isConfSaved = false
    commit('SET_PRESENTATION', presentation)
  },
  resetTemporalPresentationConfig({getters, commit}, payload) {
    let app = getters.getApp
    let presentation = Object.assign({}, app.presentation)
    console.log('resetTemporalPresentationConfig', presentation)
    presentation.presentationId = payload.presentationId
    presentation.name = payload.name
    presentation.product = payload.product
    presentation.useShared = payload.useShared
    presentation.isConfSaved = true
    commit('SET_PRESENTATION', presentation)
  },
  setTemporalPresentationInfo({getters, commit}, payload) {
    let app = getters.getApp
    let presentation = Object.assign({}, app.presentation)
    presentation.presentationId = payload.presentationId
    presentation.name = payload.name
    presentation.product = payload.product
    presentation.useShared = payload.useShared
    presentation.savedSlides = JSON.parse(JSON.stringify(payload.slides))
    commit('SET_PRESENTATION', presentation)
  },
  setTemporalConfigSavedState({commit}, payload) {
    commit('SET_CONFIG_SAVED_STATE', payload)
  },
  saveSlides({commit}, payload) {
    commit('SET_SAVED_SLIDES', JSON.parse(JSON.stringify(payload)))
  },
  deleteTemporalPresentationInfo({commit}) {
    commit('DELETE_PRESENTATION')
  }
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}