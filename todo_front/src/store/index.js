import { createStore } from "vuex";
import axios from "axios";
import Cookies from 'cookies-js';
// import router from "../router";

// Create a new store instance.
const store = createStore({
  // state is like our data
  state: {
    // our storages
    username: null,
    user_id: null,
    accessToken: null,
    refreshToken: null,

    // Urls that deal with sjwt
    sjwt_url: "http://127.0.0.1:8000/api/token/",
    sjwt_register_url: "http://localhost:8000/register/",
    sjwt_refresh_url: "http://127.0.0.1:8000/api/token/refresh/",
    sjwt_verify_url: 'http://127.0.0.1:8000/api/token/verify/',

    // Tasks
    all_tasks: [],
    completed_tasks: [],
    tasks: [],

  },
  // mutations are like our sync methods
  mutations: {
    updateStorage(state, { username, user_id, access, refresh}) {
      state.username = username;
      state.user_id = user_id;
      state.accessToken = access;
      state.refreshToken = refresh;
      console.log(`
      original username: ${username}
      username : ${state.username},
      original id: ${user_id},
      id: ${state.user_id},
      original access token: ${access},
      access token: ${state.accessToken},
      original refresh token: ${refresh},
      refresh token: ${state.refreshToken}
      `)
    },
    destroyToken(state) {
      state.accessToken = null;
      Cookies.expire('accessToken')
      state.refreshToken = null;
      Cookies.expire('refreshToken')
      state.user_id = null;
      Cookies.expire('user_id')
      state.username = null;
      Cookies.expire('username')
    },
    updateAccessToken(state, {newAccessToken}){
      state.accessToken = newAccessToken
      // if we set a cookie then it overrides the current "possible" cookie giving us an up-to-date accessToken
      Cookies.set('accessToken', newAccessToken)
      console.log('Our new state access token: ' + state.accessToken)
    },
    saveAPIResponse(state, {all_tasks, completed_tasks, tasks}){
      state.all_tasks = all_tasks
      state.completed_tasks = completed_tasks
      state.tasks = tasks
      console.log(all_tasks, completed_tasks, tasks)
    }
  },
  // getters are like our computed properties
  getters: {
    loggedIn(state) {
      return state.accessToken != null;
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
              username: response.data.user,
              user_id: response.data.id,
              access: response.data.access,
              refresh: response.data.refresh,
            });
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    userRegister(context, usercredentials){
      return new Promise((resolve, reject) =>{
        axios.post(store.state.sjwt_register_url, {
            username: usercredentials.username,
            password: usercredentials.password,
          })
          .then((response) => {
            context.commit("updateStorage", {
              username: response.data.username,
              user_id: response.data.id,
              access: response.data.access,
              refresh: response.data.refresh,
            });
            resolve();
          })
          .catch((err) => {
            reject(err)
          });
      })

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
     // reinitalizeStore will be used to set any data besides tokens
    reinitializeStore(context){
      return new Promise((resolve)=>{
         // Here are our initial values to use
      let access = Cookies.get('accessToken')
      let refresh = Cookies.get('refreshToken')
      let username = Cookies.get('username')
      let user_id = Cookies.get('user_id')

      // We are going to post our access token to a verify url
      axios.post(context.state.sjwt_verify_url, {token:access}).then(()=>{
        // If status is 200 then we are just going commit our update storage mutations with the initial values
        context.commit('updateStorage', {username, user_id, access, refresh})
        resolve()
      }).catch(()=>{
        if(access){
           // if we were to get the error that means the token has expired so lets use our refresh token to obtain a new one
          context.dispatch('updateAccessToken', {refreshToken:refresh}).then(()=>{
            // Once the dispatch is completed then we have an updated accessToken cookie in which we set for access
            context.commit('updateStorage', {username, user_id, access: Cookies.get('accessToken') , refresh})
            resolve()
          })
        }else{
          // We cannot force push to Login because if we do our homepage router will be glitched with login requests
          // router.push({name:'Login'})
          resolve()
        }
      })
      })
    },
    // We are going to use callAPI to grab the tasks in our api
    callAPI(context, {showTodosAPI, user_id, accessToken}){
       let completed_tasks = []
       let tasks = []

       axios
        .get(showTodosAPI + user_id, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          for (let task_id in response.data) {
            let task = response.data[task_id];
            if (task["task_completed"]) {
              completed_tasks.push(task);
            } else {
              tasks.push(task);
            }
          }
          // After we fully pushed all of our tasks into their correct category based on status we need update storage
          context.commit('saveAPIResponse',{
            all_tasks: tasks + completed_tasks,
            completed_tasks: completed_tasks,
            tasks: tasks,
          })

        })
    },

  },
});

export default store;
