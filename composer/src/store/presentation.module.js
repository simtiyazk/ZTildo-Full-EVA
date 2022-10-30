
import Vue from 'vue'
import axios from 'axios'
import utils from '../assets/js/utils'

const getPresentationDefaultState = () => {
  return {
    id: '',
    presentationId: '',
    name: '',
    product: '',
    useShared: true,
    slides: [],
    saved: null,
    isNew: false,
    modified: false
  }
}
// State object
const state = {
  presentation: getPresentationDefaultState()
}


// Getter functions
const getters = {
  getPresentation( state ) {
     return state.presentation
  }
}


// Mutations
const mutations = {
  SET_PRESENTATION(state, payload) {
    Vue.set(state, 'presentation', payload)
  },
  SET_PRESENTATION_MODIFIED_STATUS(state, payload) {
    Vue.set(state.presentation, 'modified', payload)
  },
  SET_PRESENTATION_SAVED_STATUS(state, payload) {
    Vue.set(state.presentation, 'saved', payload)
  },
  SET_PRESENTATION_SLIDES(state, payload) {
    Vue.set(state, 'presentation', payload)
  },
  CLEAR_PRESENTATION(state) {
    Vue.set(state, 'presentation', getPresentationDefaultState())
  },
  SET_ACTIVE_STATUS(state, payload) {
    Vue.set(state.presentation.slides, payload.index, payload.slide)
  },
  DELETE_SLIDE(state, payload) {
    Vue.set(state.presentation, 'modified', true)
    state.presentation.slides.splice(payload, 1)
  },
  ADD_SLIDE(state, payload) {
    state.presentation.slides.push(payload)
  },
  SAVE_EDITED_SLIDE(state, payload) {
    Vue.set(state.presentation.slides, payload.index, payload.slide)
  },
  CLONE_SLIDE(state, payload) {
    state.presentation.slides.splice(payload.index + 1, 0, payload.slide)
  }
}


// Actions
const actions = {
  savePresentationAPI({commit, getters, dispatch, rootGetters}) {
    let presentation = getters.getPresentation
    let app = rootGetters['AppModule/getApp']

    var msg = {
      text: '',
      type: 'info'
    }

    utils.appendPercentageValues(presentation, app.presentation.dimensions)

    if(presentation.isNew) {
      axios.post('/api/create',
        { presentation: presentation },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function() {
          dispatch('updatePresentationSavedStatus',{status: true})
          msg.text = 'Presentation created';
        })
        .catch(function(err) {
          dispatch('updatePresentationSavedStatus',{status: false})
          commit('setAppError', err)
          msg.text = err
          msg.type = 'danger'
        })
    } else {
      axios.put('/api/update',
      { presentation: presentation },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function() {
        dispatch('updatePresentationSavedStatus',{ status: true})
        msg.text = 'Presentation updated';
      })
      .catch(function(err) {
        dispatch('updatePresentationSavedStatus',{ status: false})
        commit('setAppError', err)
        msg.text = err
        msg.type = 'danger'
      })
    }
    dispatch('AppModule/setAppMessage', msg, {root: true})
  },
  setNewPresentation({getters, commit, dispatch}, payload) {
    let presentation = getters.getPresentation
    presentation.presentationId = payload.presentationId
    presentation.name = payload.name
    presentation.product = payload.product
    presentation.useShared = payload.useShared
    presentation.slides = payload.slides
    presentation.isNew = true
    commit('SET_PRESENTATION', presentation)
    dispatch('AppModule/setTemporalPresentationInfo', payload, {root: true})
  },
  loadPresentation({getters, commit}, payload) {
    let presentation = getters.getPresentation
    presentation.id = payload.id
    presentation.presentationId = payload.presentationId
    presentation.name = payload.name
    presentation.product = payload.product
    presentation.useShared = payload.useShared
    presentation.slides = payload.slides
    presentation.isNew = false
    commit('SET_PRESENTATION', presentation)
  },
  savePresentation({dispatch, rootGetters}) {
    let app = rootGetters['AppModule/getApp']
    dispatch('savePresentationConfiguration', app.presentation)
    dispatch('AppModule/setTemporalConfigSavedState', true, {root: true})
    dispatch('savePresentationAPI')
  },
  resetPresentation({dispatch}) {
    dispatch('AppModule/resetTemporalPresentationConfig', null, {root: true})
    dispatch('resetPresentationSlideList')
    dispatch('SlideEditModule/clearEditingSlide', null, {root: true})
  },
  savePresentationConfiguration({getters, commit}, payload) {
    let presentation = getters.getPresentation
    presentation.presentationId = payload.presentationId
    presentation.name = payload.name
    presentation.product = payload.product
    presentation.useShared = payload.useShared
    commit('SET_PRESENTATION', presentation)
  },
  clearPresentationInfo({commit, dispatch}) {
    commit('CLEAR_PRESENTATION')
    dispatch('AppModule/deleteTemporalPresentationInfo', null, { root: true })
  },
  setPresentationData({commit, dispatch}, presentation) {
    commit('SET_PRESENTATION', presentation)
    dispatch('AppModule/setTemporalPresentationInfo', presentation, {root: true})
  },
  setPresentationModifiedStatus({commit}, payload) {
    commit('SET_PRESENTATION_MODIFIED_STATUS', payload)
  },
  updatePresentationSavedStatus({commit, dispatch, getters}, status) {
    let presentation = getters.getPresentation
    commit('SET_PRESENTATION_SAVED_STATUS', status)
    if(status) {
      dispatch('AppModule/saveSlides', JSON.parse(JSON.stringify(presentation.slides)), {root: true})
      commit('SET_PRESENTATION_MODIFIED_STATUS', false)
    } else {
      commit('SET_PRESENTATION_MODIFIED_STATUS', true)
    }
  },
  resetPresentationSlideList({commit, rootGetters}) {
    let app = rootGetters['AppModule/getApp']
    let presentation = Object.assign({}, app.presentation)
    presentation.slides = JSON.parse(JSON.stringify(presentation.savedSlides))
    presentation.modified = false
    presentation.saved = null
    commit('SET_PRESENTATION_SLIDES', presentation)
  },
  addNewSlide({commit}, slide) {
    commit('ADD_SLIDE', slide)
  },
  deleteSlide({commit}, index) {
    commit('DELETE_SLIDE', index)
  },
  duplicateSlide({commit, getters}, index) {
    let presentation = getters.getPresentation
    let slide = Object.assign({}, presentation.slides[index])
    slide.ctas = (slide.ctas !== undefined) && (slide.ctas.length > 0) ? JSON.parse(JSON.stringify(slide.ctas)) : []
    slide.id += '_00'
    commit('SET_PRESENTATION_MODIFIED_STATUS', true)
    commit('CLONE_SLIDE', {index, slide})
  },
  toggleActiveSlide({getters, commit}, index){
    let presentation = getters.getPresentation
    let slide = {
      ...presentation.slides[index]
    }
    slide.isActive = slide.isActive ? false : true
    commit('SET_ACTIVE_STATUS', { index, slide })
  },
  saveEditedSlide({commit, getters}, values) {
    let presentation = getters.getPresentation
    let slide = {
      ...presentation.slides[values.index]
    }
    slide.id = values.id
    slide.backgroundUrl = values.backgroundUrl
    slide.ctas = values.ctas

    commit('SAVE_EDITED_SLIDE', {index: values.index, slide})
  }
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}