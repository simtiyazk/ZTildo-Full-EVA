import Vue from 'vue'
import utils from '../assets/js/utils'

const getCTADefaultState = () => {
  return {
    link: '',
    position: {
      x: 0,
      y: 0
    },
    size: {
      width: 100,
      height: 50
    }
  }
}
const getSlideEditDefaultState = () => {
  return {
    id: null,
    index: -1,
    backgroundUrl: '',
    ctas: [],
    isNew: true,
    errors: {
      inputId: false
    },
    modified: false
  }
}
// State object
const state = {
  slideEdit: getSlideEditDefaultState()
}


// Getter functions
const getters = {
  getSlideEdit( state ) {
     return state.slideEdit
  },

}

// Mutations
const mutations = {
  SET_SLIDE(state, payload) {
    Vue.set(state, 'slideEdit', payload)
  },
  UPDATE_SLIDE(state, payload) {
    Vue.set(state, 'slideEdit', payload)
  },
  SET_CTAS(state, payload) {
    Vue.set(state.slideEdit, 'ctas', payload)
  },
  ADD_CTA(state, payload) {
    state.slideEdit.ctas.push(payload)
  },
  UPDATE_CTA(state, payload) {
    Vue.set(state.slideEdit.ctas, payload.index, payload.cta)
  },
  DELETE_CTA(state, payload) {
    state.slideEdit.ctas.splice(payload, 1)
  },
  SET_BACKGROUND(state, payload) {
    Vue.set(state.slideEdit, 'backgroundUrl', payload)
  },
  SET_MODIFIED_STATUS(state, payload) {
    Vue.set(state.slideEdit, 'modified', payload)
  },
  SET_ERROR(state, payload) {
    Vue.set(state.slideEdit.errors, 'inputId', (payload === ''))
  }
}

// Actions
const actions = {
  setScaleSlideEditCTAs({commit, getters, rootGetters}, newSize) {
    let app = rootGetters['AppModule/getApp']
    let slideEdit = getters.getSlideEdit
    let ctas = utils.scaleSlideCTAs(
      {
        width: app.view.size.width,
        height: app.view.size.height
      },
      newSize,
      slideEdit.ctas
    )
    commit('SET_CTAS', ctas)
  },
  saveSlideOnEdition({dispatch, getters, rootGetters}) {
    let app = rootGetters['AppModule/getApp']
    let slideEdit = getters.getSlideEdit
    let ctas = utils.scaleSlideCTAs(
      {
        width: app.view.size.width,
        height: app.view.size.height
      },
      {
        width: app.presentation.dimensions.width,
        height: app.presentation.dimensions.height
      },
      slideEdit.ctas
    )
    dispatch('PresentationModule/setPresentationModifiedStatus', true, { root: true })
    if(slideEdit.isNew) {
      let newSlide = JSON.parse(JSON.stringify(rootGetters['AppModule/getConstSlide']));

      newSlide.id = slideEdit.id
      newSlide.backgroundUrl = slideEdit.backgroundUrl
      newSlide.ctas = ctas
      dispatch('PresentationModule/addNewSlide', newSlide, { root: true })
    } else {
      dispatch('PresentationModule/saveEditedSlide', {
        index: slideEdit.index,
        id: slideEdit.id,
        backgroundUrl: slideEdit.backgroundUrl,
        ctas: ctas
      }, { root: true })
    }
  },
  moveCTAArrows({getters, rootGetters, dispatch}, values) {
    let app = rootGetters['AppModule/getApp']
    let slideEdit = getters.getSlideEdit
    let positionX = slideEdit.ctas[values.index].position.x
    let positionY = slideEdit.ctas[values.index].position.y

    switch(values.key) {
      case 'up':
        if(slideEdit.ctas[values.index].position.y > 0) {
          dispatch('setCTAPositionY', {index: values.index, y: positionY - 1})
        }
        break
      case 'down':
        if(slideEdit.ctas[values.index].position.y < app.view.size.height) {
          dispatch('setCTAPositionY', {index: values.index, y: positionY + 1})
        }
        break
      case 'left':
        if(slideEdit.ctas[values.index].position.x > 0) {
          dispatch('setCTAPositionX', {index: values.index, x: positionX - 1})
        }
        break
      case 'right':
        if(slideEdit.ctas[values.index].position.x < app.view.size.width) {
          dispatch('setCTAPositionX', {index: values.index, x: positionX + 1})
        }
    }
  },
  loadSlideForEdit({commit, getters, rootGetters}, index) {
    let app = rootGetters['AppModule/getApp']
    let presentation = rootGetters['PresentationModule/getPresentation']
    let slideEdit = getters.getSlideEdit
    let ctas = utils.scaleSlideCTAs(
      {
        width: app.presentation.dimensions.width,
        height: app.presentation.dimensions.height
      },
      {
        width: app.view.size.width,
        height: app.view.size.height
      },
      presentation.slides[index].ctas
    )
    let id = presentation.slides[index].id
    let backgroundUrl = presentation.slides[index].backgroundUrl

    let slide = {
      ...slideEdit
    }

    slide.index = index
    slide.isNew = false
    slide.id = id
    slide.backgroundUrl = backgroundUrl
    slide.ctas = ctas

    commit('UPDATE_SLIDE', slide)
  },
  updateAppViewSize({dispatch}, size) {
    dispatch('setScaleSlideEditCTAs', size);
    dispatch('AppModule/setAppViewSize', size, { root: true })
  },
  addCTA({commit}) {
    let cta = getCTADefaultState()
    commit('ADD_CTA', JSON.parse(JSON.stringify(cta)))
  },
  setSlideEditError({commit}, value) {
    commit('SET_ERROR', value)
  },
  setSlideEditModifiedStatus({commit}, value) {
    commit('SET_MODIFIED_STATUS', value)
  },
  clearEditingSlide({commit}) {
    commit('SET_SLIDE', getSlideEditDefaultState())
  },
  resizeCTA({getters, commit}, values) {
    let slideEdit = getters.getSlideEdit
    let cta = JSON.parse(JSON.stringify(slideEdit.ctas[values.index]));
    cta.position.x = values.x
    cta.position.y = values.y
    cta.size.width = values.width
    cta.size.height = values.height
    commit('UPDATE_CTA', {index: values.index, cta})
  },
  dragCTA({getters, commit}, values) {
    let slideEdit = getters.getSlideEdit
    let cta = JSON.parse(JSON.stringify(slideEdit.ctas[values.index]));
    cta.position.x = values.x
    cta.position.y = values.y
    commit('UPDATE_CTA', {index: values.index, cta})
  },
  setCTAPositionX({getters, commit}, values) {
    let slideEdit = getters.getSlideEdit
    let cta = JSON.parse(JSON.stringify(slideEdit.ctas[values.index]));
    cta.position.x = values.x
    commit('UPDATE_CTA', {index: values.index, cta})
  },
  setCTAPositionY({getters, commit}, values) {
    let slideEdit = getters.getSlideEdit
    let cta = JSON.parse(JSON.stringify(slideEdit.ctas[values.index]));
    cta.position.y = values.y
    commit('UPDATE_CTA', {index: values.index, cta})
  },
  removeCTA({commit}, index) {
    commit('DELETE_CTA', index)
  },
  setBackground({commit}, url) {
    commit('SET_BACKGROUND', url)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}