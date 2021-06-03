import { createStore } from "vuex";
import axios from "axios";
import Cookies from 'cookies-js';

// Create a new store instance.
const store = createStore({
  // state is like our data
  state: {
    username: null,
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
    sjwt_url: "http://127.0.0.1:8000/api/token/",
    sjwt_refresh_url: "http://127.0.0.1:8000/api/token/refresh/",
    sjwt_verify_url: 'http://127.0.0.1:8000/api/token/verify/',
  },
  // mutations are like our sync methods
  mutations: {
    updateStorage(state, { username, access, refresh, loggedIn }) {
      state.username = username
      state.accessToken = access;
      state.refreshToken = refresh;
      if(loggedIn){
        state.isLoggedIn = loggedIn
      }
      console.log(`
      original username: ${username}
      username : ${state.username},
      original access token: ${access},
      access token: ${state.accessToken},
      original refresh token: ${refresh},
      refresh token: ${state.refreshToken},
      original logged in: ${loggedIn},
      logged in: ${state.isLoggedIn},
      `)
    },
    destroyToken(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
    updateAccessToken(state, {newAccessToken}){
      console.log('Our new access token: ' + newAccessToken)
      state.accessToken = newAccessToken
      console.log('Our new state access token: ' + state.accessToken)
    }
  },
  // getters are like our computed properties
  getters: {
    loggedIn(state) {
      return state.isLoggedIn;
    },
  },
  // actions are just async methods
  actions: {
    // our logout action will just destroy our tokens which makes loggedIn false
    userLogout(context) {
      if (context.getters.loggedIn) {
        context.commit("destroyToken");
      }
    },
    userLogin(context, usercredentials) {
      return new Promise((resolve, reject) => {
        axios
          .post(store.state.sjwt_url, {
            username: usercredentials.username,
            password: usercredentials.password,
          })
          .then((response) => {
            context.commit("updateStorage", {
              username: usercredentials.username,
              access: response.data.access,
              refresh: response.data.refresh,
              loggedIn: true
            });
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updateAccessToken(context, {refreshToken}){
      return new Promise((resolve, reject) =>{
         axios.post(context.state.sjwt_refresh_url,{
          refresh: refreshToken
        }).then(response =>{
          // You have to stop doing context.commit('updateAccessToken', response.data.access) it's undef
          context.commit('updateAccessToken', {newAccessToken:response.data.access})
         resolve();
        })
        .catch((err) =>{
        reject(err);
      });

      })

    },
    reinitializeStore(context){
      // Before we commit our cookies lets run a check on our access token and make sure its working
      axios.post(context.state.sjwt_verify_url, {token:context.state.accessToken}).then(()=>{
        console.log('We are good')
      }).catch(()=>{
        // if we were to get the error that means the token has expired so lets use our refresh token to obtain a new one
        context.dispatch('updateAccessToken', {refreshToken:context.state.refreshToken}).then(()=>{
          // if we set a cookie then it overrides the current "possible" cookie giving us an up-to-date accessToken
          Cookies.set('accessToken', context.state.accessToken)
        })
      })
      // Lets check up our cookies to set back our states
      let access = Cookies.get('accessToken')
      let refresh = Cookies.get('refreshToken')
      let loggedIn = Cookies.get('isLoggedIn')
      let username = Cookies.get('username')
      // make sure the names of the payload are the same as mutations
      context.commit('updateStorage', { username, access, refresh, loggedIn })

    }
  },
});

export default store;
