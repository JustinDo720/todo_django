import { createStore } from "vuex";
import axios from "axios";

// Create a new store instance.
const store = createStore({
  // state is like our data
  state: {
    username: null,
    accessToken: null,
    refreshToken: null,
    sjwt_url: "http://127.0.0.1:8000/api/token/",
  },
  // mutations are like our sync methods
  mutations: {
    updateStorage(state, { username, access, refresh }) {
      state.username = username
      state.accessToken = access;
      state.refreshToken = refresh;
    },
    destroyToken(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
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
              username: usercredentials.username,
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
  },
});

export default store;
