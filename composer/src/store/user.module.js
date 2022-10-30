import Vue from 'vue'
import axios from 'axios'

// State object
const state = {
  user: {
    id: '1234',
    name: 'veeva-visual-composer',
    presentations: []
  }
}


// Getter functions
const getters = {
  getUser(state) {
    return state.user
  }
}

// Mutations
const mutations = {
  setPresentationList(state, list) {
    Vue.set(state.user, 'presentations', list)
  },
}

// Actions
const actions = {
  loadPresentationList({commit}){
    axios.get('/api/list')
    .then(response => (commit('setPresentationList', response.data)))
    .catch(function(err) {
      console.log(err)
    })
  },
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}