import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      loggedInUser: null,
      loggedIn: false,
      loggedInToken: null
    }
  },
  mutations: {
    setLoggedData (state, payload) {
        state.loggedInUser = payload.user
        state.loggedIn = payload.status
        state.loggedInToken = payload.token
    },
    clearLoggedInData(state) {
      state.loggedInUser = null
      state.loggedIn = false
      state.loggedInToken = null
      
    }
  },
  getters:{
    getLoggedIn (state) {
        return state.loggedIn
    },
  }
})

export default store;