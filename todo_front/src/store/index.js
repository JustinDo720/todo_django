import { createStore } from 'vuex'
import axios from 'axios'

// Create a new store instance.
const store = createStore({
 state: {
     accessToken: null,
     refreshToken: null,
     APIData: '',
     sjwt_url: 'http://127.0.0.1:8000/api/token/'
  },
  mutations: {
    updateStorage (state, { access, refresh }) {
      state.accessToken = access
      state.refreshToken = refresh
    },
    destroyToken (state) {
      state.accessToken = null
      state.refreshToken = null
    }
  },
  getters: {
    loggedIn (state) {
      return state.accessToken != null
    }
  },
  actions: {
    userLogout (context) {
      if (context.getters.loggedIn) {
          context.commit('destroyToken')
      }
    },
    userLogin (context, usercredentials) {
        /*
        * Here we ABSOLUTELY need to return a new promise or else the state on the main page wouldn't update
        * We need to return to use then() after dispatching our action on our components
        * This would allow us to log out our access tokens
        * */
        return new Promise((resolve, reject)=>{
            axios.post(store.state.sjwt_url, {
              username: usercredentials.username,
              password: usercredentials.password
            })
              .then(response => {
                  context.commit('updateStorage', { access: response.data.access, refresh: response.data.refresh })
                  resolve()
              }).catch(err =>{
                reject(err)
                })
            })
    }
  }
})

export default store