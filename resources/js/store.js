import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      loggedInUser: '',
      loggedIn: false,
      loggedInToken: ''
    }
  },
  mutations: {
    setLoggedData (state, payload) {
        state.loggedInUser = payload.user
        state.loggedIn = payload.status
        state.loggedInToken = payload.token
    }
  },
  getters:{
    getLoggedIn (state) {
        return state.loggedIn
    },
  }
})

export default store;