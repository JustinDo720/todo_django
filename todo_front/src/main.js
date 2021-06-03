import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import Cookies from 'cookies-js'

import "../node_modules/bulma/css/bulma.css";

let webController = createApp(App);
webController.use(store).use(router).mount("#app");

Cookies.defaults = {
    // Expires is in seconds and path just tells us that the cookies will be available everywhere
    expires : 86400,
    path: '/',
}
// We want to reinitialize vuex using localstorages and/or cookies
store.dispatch('reinitializeStore')