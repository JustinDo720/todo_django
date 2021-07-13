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
    expires : 604800, // 7 days | 86400seconds a day
    path: '/',
}
