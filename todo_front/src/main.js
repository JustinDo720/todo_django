import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import "../node_modules/bulma/css/bulma.css";

let webController = createApp(App);
webController.use(store).use(router).mount("#app");
